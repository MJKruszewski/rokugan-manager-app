<template>
  <v-card
      :dark="this.$store.state.colorVariant"
      :text-variant="this.$store.state.textVariant"
      class="container-color"
  >
    <v-card-title>
      <b>Make a roll:</b>

    </v-card-title>
    <v-divider/>

    <v-card-text v-if="$store.state.player !== undefined">
      <v-row>
        <v-col :sm="12" :md="6">
          <v-text-field
              label="Selected ring:"
              :value="$store.state.mainRoll.selectedRing"
              disabled
          />
        </v-col>
        <v-col :sm="12" :md="6">
          <v-text-field
              label="Selected skill:"
              :value="$store.state.mainRoll.selectedSkill"
              disabled
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col :sm="12" :md="3">
          <v-text-field
              id="st"
              label="Difficulty Class:"
              min="0"
              :disabled="$store.state.mainRoll.isDuringRoll"
              v-model="$store.state.mainRoll.dc"
              type="number"
              placeholder="0"
          />
        </v-col>

        <v-col :sm="12" :md="3">
          <v-text-field id="aw"
                        label="Additional white dices:"
                        min="0"
                        :disabled="this.$store.state.mainRoll.isDuringRoll"
                        v-model="$store.state.mainRoll.assistWhite"
                        type="number"
                        placeholder="0"
          />
        </v-col>

        <v-col :sm="12" :md="3">
          <v-text-field
              id="ab"
              label="Additional black dices:"
              min="0"
              :disabled="this.$store.state.mainRoll.isDuringRoll"
              v-model="$store.state.mainRoll.assistBlack"
              type="number"
              placeholder="0"
          />
        </v-col>

        <v-col :sm="12" :md="3">
          <v-text-field
              id="void"
              label="Use void points:"
              min="0"
              :max="$store.state.player.currentStats.voidPoints"
              :disabled="this.$store.state.mainRoll.isDuringRoll"
              v-model="$store.state.mainRoll.voidPoints"
              type="number"
              placeholder="0"
          />
        </v-col>
      </v-row>

      <br/>
      <br/>

      <v-row>
        <v-col>
          <v-select
              :dark="this.$store.state.colorVariant"
              label="Select reroll cause:"
              :disabled="$store.state.mainRoll.rerollStarted || $store.state.mainRoll.selectedIds.length > 0"
              v-model="$store.state.mainRoll.selectedRerollOption"
              v-on:change="selectRerollOptions"
              :items="['Ability', 'Adversity', 'Anxiety', 'Distinction']"
          />
        </v-col>
        <v-col>
          <v-select
              :dark="this.$store.state.colorVariant"
              v-model="$store.state.mainRoll.selectedRerollReasonOption"
              label="Select reroll reason:"
              :disabled="$store.state.mainRoll.rerollStarted || $store.state.mainRoll.selectedIds.length > 0"
              :items="$store.state.mainRoll.selectedRerollOptionList"
          />
        </v-col>
        <v-col>
          <v-btn variant="warning"
                 :disabled="startRerollDisabled($store.state.mainRoll.selectedRerollReasonOption)"
                 v-on:click="startReroll($store.state.mainRoll.selectedRerollReasonOption)">Start
          </v-btn>&nbsp;&nbsp;
          <v-btn variant="info"
                 :disabled="finishRerollDisabled($store.state.mainRoll.selectedRerollReasonOption)"
                 v-on:click="finishReroll($store.state.mainRoll.selectedRerollReasonOption)">Finish
          </v-btn>&nbsp;&nbsp;
        </v-col>
      </v-row>

      <br/>

      <template v-for="dice in this.$store.state.mainRoll.wDices">
        <img
            :class="{ selected : $store.state.mainRoll.selectedIds.includes(dice.id), 'selected-to-reroll': $store.state.mainRoll.selectedToRerollIds.includes(dice.id) }"
            v-on:click="selectDice(dice)" width="40px" height="40px" :src="require('./../../assets/img/dice/' + dice.img)"
            :key="dice.id"/>&nbsp;
      </template>
      <template v-for="dice in this.$store.state.mainRoll.bDices">
        <img
            :class="{
                 selected : $store.state.mainRoll.selectedIds.includes(dice.id),
                'selected-to-reroll': $store.state.mainRoll.selectedToRerollIds.includes(dice.id),
                'selected-void': $store.state.mainRoll.selectedIds.includes(dice.id) && $store.state.mainRoll.voidDicesHelper.includes(dice.id),
            }"
            v-on:click="selectDice(dice)" width="40px" height="40px" :src="require('./../../assets/img/dice/' + dice.img)"
            :key="dice.id"/>&nbsp;
      </template>

      <br v-if="this.$store.state.mainRoll.wExplodedDices.length > 0 || this.$store.state.mainRoll.bExplodedDices.length > 0"/>
      <br v-if="this.$store.state.mainRoll.wExplodedDices.length > 0 || this.$store.state.mainRoll.bExplodedDices.length > 0"/>
      <p v-if="this.$store.state.mainRoll.wExplodedDices.length > 0 || this.$store.state.mainRoll.bExplodedDices.length > 0">
        Exploded dices:</p>

      <template v-for="dice in this.$store.state.mainRoll.wExplodedDices">
        <img :class="{ selected : $store.state.mainRoll.selectedIds.includes(dice.id) }" v-on:click="selectDice(dice)"
             width="40px" height="40px" :src="require('./../../assets/img/dice/' + dice.img)" :key="dice.id"/>&nbsp;
      </template>
      <template v-for="dice in this.$store.state.mainRoll.bExplodedDices">
        <img :class="{ selected : $store.state.mainRoll.selectedIds.includes(dice.id) }" v-on:click="selectDice(dice)"
             width="40px" height="40px" :src="require('./../../assets/img/dice/' + dice.img)" :key="dice.id"/>&nbsp;
      </template>

      <br/>
      <br/>

      <v-btn id="roll" variant="primary"
             :disabled="this.canRoll()" v-on:click="roll">
        Roll
      </v-btn>&nbsp;&nbsp;
      <v-btn variant="warning" :disabled="!this.hasAnyExplosions || this.$store.state.mainRoll.rerollStarted"
             v-on:click="explode">Explode
      </v-btn>&nbsp;&nbsp;
      <v-btn variant="success"
             :disabled="!this.$store.state.mainRoll.isDuringRoll || this.$store.state.mainRoll.selectedIds.length === 0 || this.$store.state.mainRoll.rerollStarted"
             v-on:click="sendResultDiscord">Finish
      </v-btn>
      <br/>
      <br/>

      <v-row>
        <v-col>
          <v-text-field
              label="Success:"
              disabled
              :value="this.$store.state.mainRoll.success"
          />
        </v-col>
        <v-col>
          <v-text-field
              label="Opportunities:"
              disabled
              :value="this.$store.state.mainRoll.opportunities"
          />
        </v-col>
        <v-col>
          <v-text-field
              label="Strife:"
              disabled
              :value="this.$store.state.mainRoll.strife"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text v-else>
      <v-skeleton-loader type="article, actions"></v-skeleton-loader>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import {getBlackImage, getClanColor, getExplosions, getHook, getWhiteImage, sendNotifications} from "@/domain/common";
import mergeImages from "merge-images-horizontally-with-text/dist/index.es2015";
import Vue from "vue";

const explosions = getExplosions();

export default Vue.extend({
  name: 'MakeRollComponent',
  data() {
    return {
      webhook: require("webhook-discord"),
      hook: getHook(),
      uuid: require("uuid"),
    }
  },
  computed: {
    hasAnyExplosions: function () {
      if (this.$store.state.mainRoll.isDuringRoll === false || this.$store.state.mainRoll.totalExplosions >= this.countPossibleExplosions()) {
        return false;
      }

      let isPresent = false;

      this.$store.state.mainRoll.bDices.forEach(dice => {
        if (!this.$store.state.mainRoll.selectedIds.includes(dice.id)) {
          return;
        }

        if (explosions.includes(dice.img)) {
          isPresent = true;
        }
      });
      this.$store.state.mainRoll.wDices.forEach(dice => {
        if (!this.$store.state.mainRoll.selectedIds.includes(dice.id)) {
          return;
        }

        if (explosions.includes(dice.img)) {
          isPresent = true;
        }
      });
      this.$store.state.mainRoll.wExplodedDices.forEach(dice => {
        if (!this.$store.state.mainRoll.selectedIds.includes(dice.id)) {
          return;
        }

        if (explosions.includes(dice.img)) {
          isPresent = true;
        }
      });
      this.$store.state.mainRoll.bExplodedDices.forEach(dice => {
        if (!this.$store.state.mainRoll.selectedIds.includes(dice.id)) {
          return;
        }

        if (explosions.includes(dice.img)) {
          isPresent = true;
        }
      });

      return isPresent;
    }
  },
  methods: {
    roll: async function () {
      if (this.$store.state.mainRoll.isDuringRoll) {
        return;
      }

      const randomNumber = require("random-number-csprng-2");

      this.$store.state.mainRoll.isDuringRoll = true;
      this.$store.state.mainRoll.wDices = [];
      this.$store.state.mainRoll.bDices = [];
      this.$store.state.mainRoll.rerollLock = [];
      this.$store.state.mainRoll.explodedHelper = [];
      this.$store.state.mainRoll.bExplodedDices = [];
      this.$store.state.mainRoll.wExplodedDices = [];
      this.$store.state.mainRoll.voidDicesHelper = [];
      this.$store.state.mainRoll.selectedIds = [];
      this.$store.state.mainRoll.success = 0;
      this.$store.state.mainRoll.strife = 0;
      this.$store.state.mainRoll.opportunities = 0;
      this.$store.state.mainRoll.totalExplosions = 0;
      this.$store.state.mainRoll.selectedAbility = null;
      this.$store.state.mainRoll.selectedAdversity = null;
      this.$store.state.mainRoll.currentReroll = null;
      this.$store.state.mainRoll.selectedAnxiety = null;
      this.$store.state.mainRoll.selectedDistinction = null;

      for (let i = 0; i < this.$store.state.mainRoll.selectedSkillValue; i++) {
        let result = await randomNumber(1, 8);

        this.$store.state.mainRoll.wDices.push({
          id: this.uuid.v4(),
          img: getWhiteImage(result)
        });
      }

      for (let i = 0; i < this.$store.state.mainRoll.assistWhite; i++) {
        let result = await randomNumber(1, 8);

        this.$store.state.mainRoll.bDices.push({
          id: this.uuid.v4(),
          img: getWhiteImage(result)
        });
      }

      for (let i = 0; i < this.$store.state.mainRoll.selectedRingValue; i++) {
        let result = await randomNumber(1, 6);

        this.$store.state.mainRoll.bDices.push({
          id: this.uuid.v4(),
          img: getBlackImage(result)
        });
      }

      for (let i = 0; i < this.$store.state.mainRoll.assistBlack; i++) {
        let result = await randomNumber(1, 6);

        this.$store.state.mainRoll.bDices.push({
          id: this.uuid.v4(),
          img: getBlackImage(result)
        });
      }

      for (let i = 0; i < this.$store.state.mainRoll.voidPoints; i++) {
        let result = await randomNumber(1, 6);
        let id = this.uuid.v4();

        this.$store.state.mainRoll.bDices.push({
          id: id,
          img: getBlackImage(result)
        });
        this.$store.state.mainRoll.voidDicesHelper.push(id)
        this.$store.state.mainRoll.selectedIds.push(id)
        this.calculateStats();
      }

      this.$bvToast.toast(`Please select dices to keep by clicking on them`, {
        title: 'Information',
        autoHideDelay: 2000,
        appendToast: true
      })

      localStorage.setItem('mainRoll', JSON.stringify(this.$store.state.mainRoll));
    },
    explode: async function () {
      if (this.$store.state.mainRoll.isDuringRoll === false) {
        return;
      }

      this.$store.state.mainRoll.isExplosionStarted = true;
      this.$store.state.mainRoll.totalExplosions++;

      const merged = [
        ...this.$store.state.mainRoll.bDices,
        ...this.$store.state.mainRoll.wDices,
        ...this.$store.state.mainRoll.wExplodedDices,
        ...this.$store.state.mainRoll.bExplodedDices,
      ];

      const result = merged.filter(dice => {
        return this.$store.state.mainRoll.selectedIds.includes(dice.id)
      }).filter(dice => {
        return explosions.includes(dice.img) && !this.$store.state.mainRoll.explodedHelper.includes(dice.id)
      })

      if (result.length === 0) {
        return;
      }

      const dice = result.pop();
      this.$store.state.mainRoll.explodedHelper.push(dice.id);
      const randomNumber = require("random-number-csprng-2");
      let rand;
      let id;

      switch (dice.img) {
        case "blacket.png":
          rand = await randomNumber(1, 6);
          id = this.uuid.v4();

          this.$store.state.mainRoll.bExplodedDices.push({
            id: id,
            img: getBlackImage(rand)
          });
          this.$store.state.mainRoll.selectedIds.push(id)
          this.calculateStats();

          break;
        case "whitee.png":
        case "whiteeo.png":
        case "whiteet.png":
          rand = await randomNumber(1, 8);
          id = this.uuid.v4();

          this.$store.state.mainRoll.wExplodedDices.push({
            id: id,
            img: getWhiteImage(rand)
          });
          this.$store.state.mainRoll.selectedIds.push(id)
          this.calculateStats();

          break;
      }

      this.$bvToast.toast(`Remember! You can unselect exploded dice!`, {
        title: 'Information',
        autoHideDelay: 2000,
        appendToast: true
      })

      localStorage.setItem('mainRoll', JSON.stringify(this.$store.state.mainRoll));
    },
    startReroll: function (selected : string|null|undefined) {
      if (this.$store.state.mainRoll.rerollLock.includes(selected)) {
        return;
      }

      this.$store.state.mainRoll.rerollStarted = true;
      this.$store.state.mainRoll.selectedToRerollIds = [];
      this.$store.state.mainRoll.currentReroll = selected;
      this.$store.state.mainRoll.rerollLock.push(selected);

      this.$bvToast.toast(`Please select dices to keep by clicking on them`, {
        title: 'Information',
        autoHideDelay: 2000,
        appendToast: true
      })

      localStorage.setItem('mainRoll', JSON.stringify(this.$store.state.mainRoll));
    },
    finishReroll: function (selected) {
      const randomNumber = require("random-number-csprng-2");

      this.$store.state.mainRoll.wDices.filter(dice => this.$store.state.mainRoll.selectedToRerollIds.includes(dice.id)).forEach(async dice => {
        let result = await randomNumber(1, 8);

        dice.img = getWhiteImage(result)
      })
      this.$store.state.mainRoll.bDices.filter(dice => this.$store.state.mainRoll.selectedToRerollIds.includes(dice.id)).forEach(async dice => {
        let result = await randomNumber(1, 6);

        dice.img = getBlackImage(result)
      })

      if (sendNotifications()) {
        const hook = new this.webhook.Webhook(Buffer.from(getHook(), 'base64').toString());
        const msg = new this.webhook.MessageBuilder()
            .setAvatar("https://upload.wikimedia.org/wikipedia/commons/7/70/Scorpion_and_the_frog_kurzon.png")
            .setTitle(this.$store.state.player.familyData.clan + ' ' + this.$store.state.player.familyData.name + ' from ' + this.$store.state.player.familyData.mon)
            .setName("Kami Bayushi")
            .setColor(this.getColor())
            .setDescription(
                "Bushi makes a reroll of his/her " + this.$store.state.mainRoll.selectedToRerollIds.length + " dices due to: " + selected
            );

        hook.send(msg);
      }

      this.$store.state.mainRoll.selectedToRerollIds = [];
      this.$store.state.mainRoll.rerollStarted = false;
      localStorage.setItem('mainRoll', JSON.stringify(this.$store.state.mainRoll));
    },
    selectToReroll: function (val) {
      if (this.$store.state.mainRoll.selectedToRerollIds.includes(val.id)) {
        this.$store.state.mainRoll.selectedToRerollIds = this.$store.state.mainRoll.selectedToRerollIds.filter((id) => id !== val.id)

        return;
      }

      this.$store.state.mainRoll.selectedToRerollIds.push(val.id);
      localStorage.setItem('mainRoll', JSON.stringify(this.$store.state.mainRoll));
    },
    selectRerollOptions: function (val: string) {
      switch (val.toLowerCase()) {
        case 'ability':
          this.$store.state.mainRoll.selectedRerollOptionList = this.$store.state.player.abilities;
          break;
        case 'anxiety':
          this.$store.state.mainRoll.selectedRerollOptionList = this.$store.state.player.anxieties;
          break;
        case 'adversity':
          this.$store.state.mainRoll.selectedRerollOptionList = this.$store.state.player.adversities;
          break;
        case 'distinction':
          this.$store.state.mainRoll.selectedRerollOptionList = this.$store.state.player.distinctions;
          break;
      }

      this.$store.state.mainRoll.selectedRerollReasonOption = null;
    },
    startRerollDisabled: function (val) {
      return !this.$store.state.mainRoll.isDuringRoll
          || this.$store.state.mainRoll.selectedIds.length > 0
          || val === null
          || this.$store.state.mainRoll.selectedRerollOptionList.length <= 0
          || this.$store.state.mainRoll.rerollStarted
          || this.$store.state.mainRoll.rerollLock.includes(val)
    },
    finishRerollDisabled: function (val) {

      return !this.$store.state.mainRoll.isDuringRoll
          || this.$store.state.mainRoll.selectedIds.length > 0
          || val === null
          || this.$store.state.mainRoll.selectedRerollOptionList.length <= 0
          || this.$store.state.mainRoll.rerollStarted === false
          || this.$store.state.mainRoll.currentReroll !== val;
    },
    canRoll: function () {
      return this.$store.state.mainRoll.isDuringRoll
          || !this.$store.state.player.isLoaded
          || this.$store.state.mainRoll.selectedRing === 'none'
          || this.$store.state.mainRoll.rerollStarted
    },
    selectDice: function (val, additional) {
      if (this.$store.state.mainRoll.isDuringRoll === false) {
        return;
      }

      if (this.$store.state.mainRoll.rerollStarted) {
        this.selectToReroll(val);

        return;
      }

      if (additional === true) {
        if (!this.$store.state.mainRoll.explodedHelper.includes(val.id)) {
          const filtered = [...this.$store.state.mainRoll.bExplodedDices, ...this.$store.state.mainRoll.wExplodedDices].filter((dice) => dice.id === val.id)

          if (filtered.length > 0) {
            if (this.$store.state.mainRoll.selectedIds.includes(val.id)) {
              this.$store.state.mainRoll.selectedIds = this.$store.state.mainRoll.selectedIds.filter((id) => id !== val.id)
              this.calculateStats();

              return;
            }

            this.$store.state.mainRoll.selectedIds.push(val.id);
            this.calculateStats();
          }

          return;
        }

        return;
      }

      if (this.$store.state.mainRoll.isExplosionStarted) {
        return;
      }

      if (this.$store.state.mainRoll.selectedIds.includes(val.id)) {
        this.$store.state.mainRoll.selectedIds = this.$store.state.mainRoll.selectedIds.filter((id) => id !== val.id)
        this.calculateStats();

        return;
      }

      const modifier = this.$store.state.mainRoll.selectedIds.filter(id => this.$store.state.mainRoll.voidDicesHelper.includes(id));

      if (this.$store.state.mainRoll.selectedIds.length - modifier.length >= this.$store.state.mainRoll.selectedRingValue && !this.$store.state.mainRoll.voidDicesHelper.includes(val.id)) {
        return;
      }

      this.$store.state.mainRoll.selectedIds.push(val.id);
      this.calculateStats();

      localStorage.setItem('mainRoll', JSON.stringify(this.$store.state.mainRoll));
    },
    HEXToVBColor: function (hex: string) {
      const result = /^#?([a-f\d]{2}[a-f\d]{2}[a-f\d]{2})$/i.exec(hex);
      return result ? parseInt(result[1], 16) : null;
    },
    sendResultDiscord: async function () {
      if (this.$store.state.mainRoll.isDuringRoll === false) {
        return;
      }

      this.calculateStats();

      const dices = [];

      [
        ...this.$store.state.mainRoll.wDices,
        ...this.$store.state.mainRoll.wExplodedDices,
        ...this.$store.state.mainRoll.bDices,
        ...this.$store.state.mainRoll.bExplodedDices,
      ].filter(dice => {
        return this.$store.state.mainRoll.selectedIds.includes(dice.id)
      }).forEach((dice) => {
        dices.push(require('./../../assets/img/mini/' + dice.img))
      })

      const b64 = await mergeImages(dices, {color: '#f000'});
      const axios = require('axios');

      const formData = new FormData();
      let imageBlob = await (await fetch(b64)).blob();

      formData.append('payload_json', JSON.stringify({
        username: "Kami Bayushi",
        avatar_url: "https://upload.wikimedia.org/wikipedia/commons/7/70/Scorpion_and_the_frog_kurzon.png",
        embeds: [
          {
            content: 'perkele',
            title: this.$store.state.player.familyData.clan + ' ' + this.$store.state.player.familyData.name + ' from ' + this.$store.state.player.familyData.mon + ' makes a move!',
            color: this.HEXToVBColor(this.getColor()),
            description: (this.$store.state.mainRoll.dc !== undefined && this.$store.state.mainRoll.dc !== '' && this.$store.state.mainRoll.dc > 0 ? 'TN of a roll: ' + this.$store.state.mainRoll.dc : 'TN is unknown - player gets 1 void point') + '\n'
                + (this.$store.state.mainRoll.dc !== undefined && this.$store.state.mainRoll.dc !== '' ? ((this.$store.state.mainRoll.dc <= this.$store.state.mainRoll.success) ? 'Bushi overcomes challenge!' : 'Bushi is unsuccessful in his/her attempt') + '\n\n' : '')
                + 'Samurai used ring of: ' + this.$store.state.mainRoll.selectedRing + '(' + this.$store.state.mainRoll.selectedRingValue + ')' + '\n'
                + 'Samurai used skill of: ' + this.$store.state.mainRoll.selectedSkill + '(' + this.$store.state.mainRoll.selectedSkillValue + ')' + '\n\n'
                + (this.$store.state.mainRoll.voidPoints > 0 ? 'Samurai used void points: ' + this.$store.state.mainRoll.voidPoints + '\n\n' : '')
                + 'Success: ' + this.$store.state.mainRoll.success + '\n'
                + 'Strife: ' + this.$store.state.mainRoll.strife + '\n'
                + 'Opportunities: ' + this.$store.state.mainRoll.opportunities + '\n',
            image: {
              url: "attachment://roll.png"
            },
          }
        ],
      }));
      formData.append('file', imageBlob, 'roll.png')

      await axios.post(Buffer.from(getHook(), 'base64').toString(), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })

      if (this.$store.state.mainRoll.dc === undefined || this.$store.state.mainRoll.dc === '' || this.$store.state.mainRoll.dc <= 0) {
        this.$store.state.player.currentStats.voidPoints = parseInt(this.$store.state.player.currentStats.voidPoints) + 1;
      }

      if (this.$store.state.player.currentStats.voidPoints > this.$store.state.player.rings.filter(val => val.name === 'Void').shift().value) {
        this.$store.state.player.currentStats.voidPoints = this.$store.state.player.rings.filter(val => val.name === 'Void').shift().value;
      }

      this.$store.state.player.currentStats.composure = this.$store.state.player.currentStats.composure - this.$store.state.mainRoll.strife;
      this.$store.state.player.currentStats.voidPoints = this.$store.state.player.currentStats.voidPoints - this.$store.state.mainRoll.voidPoints;

      if (this.$store.state.player.currentStats.composure < 0){
        this.$store.state.player.currentStats.composure = 0;
      }

      this.$store.state.mainRoll.isDuringRoll = false;
      this.$store.state.mainRoll.isExplosionStarted = false;
      this.$store.state.mainRoll.totalExplosions = 0;
      this.$store.state.mainRoll.voidPoints = 0;
      this.$store.state.mainRoll.explodedHelper = [];
      this.$store.state.mainRoll.rerollLock = [];

      localStorage.setItem('mainRoll', JSON.stringify(this.$store.state.mainRoll));
      localStorage.setItem('player', JSON.stringify(this.$store.state.player));
    },
    getColor: function () {
      return getClanColor(this.$store.state.player.familyData.clan)
    },
    calculateStats: function () {
      const merged = [
        ...this.$store.state.mainRoll.bDices,
        ...this.$store.state.mainRoll.wDices,
        ...this.$store.state.mainRoll.wExplodedDices,
        ...this.$store.state.mainRoll.bExplodedDices,
      ];

      let strife = 0;
      let success = 0;
      let opportunity = 0;

      merged.filter(dice => {
        return this.$store.state.mainRoll.selectedIds.includes(dice.id)
      }).forEach((dice) => {
        switch (dice.img) {
          case 'black.png':
          case 'white.png':
            break;
          case 'blacket.png':
          case 'whiteet.png':
            success++;
            strife++;
            break;
          case 'blacko.png':
          case 'whiteo.png':
            opportunity++;
            break;
          case 'blackot.png':
            opportunity++;
            strife++;
            break;
          case 'blacks.png':
            success++;
            break;
          case 'blackst.png':
            success++;
            strife++;
            break;
          case 'whitee.png':
          case 'whites.png':
            success++;
            break;
          case 'whiteso.png':
          case 'whiteeo.png':
            success++;
            opportunity++;
            break;
          case 'whitest.png':
            success++;
            strife++;
            break;
        }
      });

      this.$store.state.mainRoll.success = success;
      this.$store.state.mainRoll.strife = strife;
      this.$store.state.mainRoll.opportunities = opportunity;

      localStorage.setItem('mainRoll', JSON.stringify(this.$store.state.mainRoll));
    },
    countPossibleExplosions: function () {
      const merged = [
        ...this.$store.state.mainRoll.bDices,
        ...this.$store.state.mainRoll.wDices,
        ...this.$store.state.mainRoll.wExplodedDices,
        ...this.$store.state.mainRoll.bExplodedDices,
      ];

      return merged.filter(dice => {
        return this.$store.state.mainRoll.selectedIds.includes(dice.id)
      }).filter(dice => {
        return explosions.includes(dice.img)
      }).length;
    }
  }
})
</script>
<style>

.container-color {
  /*background-color: #343a40e6 !important;*/
}

.selected {
  filter: drop-shadow(0 0 0.75rem rgb(255, 217, 0));
}

.selected-void {
  filter: drop-shadow(0 0 0.75rem rgb(89, 255, 0)) !important;
}

.selected-to-reroll {
  filter: drop-shadow(0 0 0.75rem rgb(255, 0, 119));
}
</style>