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

    <v-card-text v-if="isPlayerPresent()">
      <v-row v-if="npc">
        <v-col :sm="12" :md="6" >
          <v-select
              :dark="this.$store.state.colorVariant"
              label="Select ring:"
              :disabled="$store.state.mainRoll.isDuringRoll"
              v-model="$store.state.mainRoll.selectedRing"
              v-on:change="setRingValue"
              :items="['Air', 'Fire', 'Water', 'Earth', 'Void']"
          />
        </v-col>
        <v-col :sm="12" :md="6">
          <v-select
              :dark="this.$store.state.colorVariant"
              label="Select skill:"
              :disabled="$store.state.mainRoll.isDuringRoll"
              v-model="$store.state.mainRoll.selectedSkill"
              v-on:change="setSkillValue"
              :items="['Artisan', 'Social', 'Martial', 'Scholar', 'Trade']"
          />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col :sm="12" :md="6" >
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

        <v-col :sm="12" :md="3" v-if="this.npc === false">
          <v-text-field
              id="void"
              label="Use void points:"
              min="0"
              :max="localPlayer !== undefined ? localPlayer.currentStats.voidPoints : 0"
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
              :items="rerollCause"
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
          <v-btn color="warning"
                 :disabled="startRerollDisabled($store.state.mainRoll.selectedRerollReasonOption)"
                 :loading="this.$store.state.mainRoll.rerollStarted"
                 v-on:click="startReroll($store.state.mainRoll.selectedRerollReasonOption)">Start
          </v-btn>&nbsp;&nbsp;
          <v-btn color="info"
                 :disabled="finishRerollDisabled($store.state.mainRoll.selectedRerollReasonOption)"
                 v-on:click="finishReroll($store.state.mainRoll.selectedRerollReasonOption)">Finish
          </v-btn>&nbsp;&nbsp;
        </v-col>
      </v-row>

      <br/>

      <template v-for="dice in this.$store.state.mainRoll.wDices">
        <img
            :class="{ selected : $store.state.mainRoll.selectedIds.includes(dice.id), 'selected-to-reroll': $store.state.mainRoll.selectedToRerollIds.includes(dice.id) }"
            v-on:click="selectDice(dice)" width="40px" height="40px" :src="require('../../assets/img/dice/' + dice.img)"
            :key="dice.id"/>&nbsp;
      </template>
      <template v-for="dice in this.$store.state.mainRoll.bDices">
        <img
            :class="{
                 selected : $store.state.mainRoll.selectedIds.includes(dice.id),
                'selected-to-reroll': $store.state.mainRoll.selectedToRerollIds.includes(dice.id),
                'selected-void': $store.state.mainRoll.selectedIds.includes(dice.id) && $store.state.mainRoll.voidDicesHelper.includes(dice.id),
            }"
            v-on:click="selectDice(dice)" width="40px" height="40px" :src="require('../../assets/img/dice/' + dice.img)"
            :key="dice.id"/>&nbsp;
      </template>

      <br v-if="this.$store.state.mainRoll.wExplodedDices.length > 0 || this.$store.state.mainRoll.bExplodedDices.length > 0"/>
      <br v-if="this.$store.state.mainRoll.wExplodedDices.length > 0 || this.$store.state.mainRoll.bExplodedDices.length > 0"/>
      <p v-if="this.$store.state.mainRoll.wExplodedDices.length > 0 || this.$store.state.mainRoll.bExplodedDices.length > 0">
        Exploded dices:</p>

      <template v-for="dice in this.$store.state.mainRoll.wExplodedDices">
        <img :class="{ selected : $store.state.mainRoll.selectedIds.includes(dice.id) }" v-on:click="selectDice(dice)"
             width="40px" height="40px" :src="require('../../assets/img/dice/' + dice.img)" :key="dice.id"/>&nbsp;
      </template>
      <template v-for="dice in this.$store.state.mainRoll.bExplodedDices">
        <img :class="{ selected : $store.state.mainRoll.selectedIds.includes(dice.id) }" v-on:click="selectDice(dice)"
             width="40px" height="40px" :src="require('../../assets/img/dice/' + dice.img)" :key="dice.id"/>&nbsp;
      </template>

      <br/>
      <br/>

      <v-btn id="roll" color="primary"
             :loading="this.$store.state.mainRoll.isDuringRoll"
             :disabled="this.canRoll()" v-on:click="roll">
        Roll
      </v-btn>&nbsp;&nbsp;
      <v-btn color="warning" :disabled="!this.hasAnyExplosions || this.$store.state.mainRoll.rerollStarted"
             v-on:click="explode">Explode
      </v-btn>&nbsp;&nbsp;
      <v-btn color="success"
             :disabled="!this.$store.state.mainRoll.isDuringRoll || this.$store.state.mainRoll.selectedIds.length === 0 || this.$store.state.mainRoll.rerollStarted"
             :loading="isSendingResult"
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
import {
  getBlackImage,
  getClanColor,
  getExplosions,
  getHook,
  getKami,
  getWhiteImage,
  sendNotifications,
} from '@/domain/common';
// noinspection TypeScriptCheckImport
//@ts-ignore
import mergeImages from 'merge-images-horizontally-with-text/dist/index.es2015';
// noinspection TypeScriptCheckImport
//@ts-ignore
import {randomInt} from 'd3-random';

import Vue from 'vue';

import axios from 'axios';
import {Dice} from '@/domain/types/dice.type';
import {Ability, Advantage, Npc, PersonalTrait, Player} from '@/domain/types/player.type';
import { Ring } from '@/domain/types/ring.type';


const explosions = getExplosions();

export default Vue.extend({
  name: 'MakeRollComponent',
  props: {
    player: Object,
    npc: Boolean,
  },
  data() {
    return {
      localPlayer: {} as Player | Npc,
      hook: getHook(),
      uuid: require('uuid'),
      isSendingResult: false,
    };
  },
  created() {
    this.localPlayer = this.player;
  },
  watch: {
    player: function(val) {
      if (val === undefined || val === '') {
        return;
      }

      this.localPlayer = val;
    },
  },
  computed: {
    rerollCause: function () {
      if (this.npc) {
        return ['Ability', 'Advantage', 'Disadvantage'];
      }

      return ['Ability', 'Adversity', 'Anxiety', 'Distinction'];
    },
    hasAnyExplosions: function () {
      if (this.$store.state.mainRoll.isDuringRoll === false || this.$store.state.mainRoll.totalExplosions >= this.countPossibleExplosions()) {
        return false;
      }

      let isPresent = false;

      this.$store.state.mainRoll.bDices.forEach((dice: Dice) => {
        if (!this.$store.state.mainRoll.selectedIds.includes(dice.id)) {
          return;
        }

        if (explosions.includes(dice.img)) {
          isPresent = true;
        }
      });
      this.$store.state.mainRoll.wDices.forEach((dice: Dice) => {
        if (!this.$store.state.mainRoll.selectedIds.includes(dice.id)) {
          return;
        }

        if (explosions.includes(dice.img)) {
          isPresent = true;
        }
      });
      this.$store.state.mainRoll.wExplodedDices.forEach((dice: Dice) => {
        if (!this.$store.state.mainRoll.selectedIds.includes(dice.id)) {
          return;
        }

        if (explosions.includes(dice.img)) {
          isPresent = true;
        }
      });
      this.$store.state.mainRoll.bExplodedDices.forEach((dice: Dice) => {
        if (!this.$store.state.mainRoll.selectedIds.includes(dice.id)) {
          return;
        }

        if (explosions.includes(dice.img)) {
          isPresent = true;
        }
      });

      return isPresent;
    },
  },
  methods: {
    isPlayerPresent: function () {
      return this.localPlayer !== undefined && Object.keys(this.localPlayer).length > 0;
    },
    setRingValue: function (newRing: string) {
      //@ts-ignore
      this.$store.state.mainRoll.selectedRingValue = (this.localPlayer as Npc).rings[newRing.toLowerCase()];

      this.$store.state.mainRoll.bDices = [];
      this.$store.state.mainRoll.selectedIds = [];

      for (let i = 0; i < this.$store.state.mainRoll.selectedRingValue; i++) {
        this.$store.state.mainRoll.bDices.push({
          id: this.uuid.v4(),
          img: 'black.png',
        });
      }
    },
    setSkillValue: function (val: string) {
      //@ts-ignore
      this.$store.state.mainRoll.selectedSkillValue = (this.localPlayer as Npc).skills[val.toLowerCase()];

      this.$store.state.mainRoll.wDices = [];
      this.$store.state.mainRoll.selectedIds = [];

      for (let i = 0; i < this.$store.state.mainRoll.selectedSkillValue; i++) {
        this.$store.state.mainRoll.wDices.push({
          id: this.uuid.v4(),
          img: 'white.png',
        });
      }
    },
    cleanState: function () {
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
    },
    roll: async function () {
      if (this.$store.state.mainRoll.isDuringRoll) {
        return;
      }

      this.$store.state.mainRoll.isDuringRoll = true;
      this.cleanState();

      const randomWhiteFunction = await randomInt(1, 12);
      const randomBlackFunction = await randomInt(1, 6);

      for (let i = 0; i < this.$store.state.mainRoll.selectedSkillValue; i++) {
        let result = randomWhiteFunction();

        this.$store.state.mainRoll.wDices.push({
          id: this.uuid.v4(),
          img: getWhiteImage(result),
        });
      }

      for (let i = 0; i < this.$store.state.mainRoll.assistWhite; i++) {
        let result = randomWhiteFunction();

        this.$store.state.mainRoll.bDices.push({
          id: this.uuid.v4(),
          img: getWhiteImage(result),
        });
      }

      for (let i = 0; i < this.$store.state.mainRoll.selectedRingValue; i++) {
        let result = randomBlackFunction();

        this.$store.state.mainRoll.bDices.push({
          id: this.uuid.v4(),
          img: getBlackImage(result),
        });
      }

      for (let i = 0; i < this.$store.state.mainRoll.assistBlack; i++) {
        let result = randomBlackFunction();

        this.$store.state.mainRoll.bDices.push({
          id: this.uuid.v4(),
          img: getBlackImage(result),
        });
      }

      for (let i = 0; i < this.$store.state.mainRoll.voidPoints; i++) {
        let result = randomBlackFunction();
        let id = this.uuid.v4();

        this.$store.state.mainRoll.bDices.push({
          id: id,
          img: getBlackImage(result),
        });
        this.$store.state.mainRoll.voidDicesHelper.push(id);
        this.$store.state.mainRoll.selectedIds.push(id);
        this.calculateStats();
      }

      const dices: string[] = [];

      [
        ...this.$store.state.mainRoll.wDices,
        ...this.$store.state.mainRoll.wExplodedDices,
        ...this.$store.state.mainRoll.bDices,
        ...this.$store.state.mainRoll.bExplodedDices,
      ].forEach((dice) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        dices.push(require('../../assets/img/mini/' + dice.img));
      });

      const b64 = await mergeImages(dices, {color: '#f000'});
      const formData = new FormData();
      let imageBlob = await (await fetch(b64)).blob();

      formData.append('payload_json', JSON.stringify({
        ...getKami(this.$store?.state?.kami),
        embeds: [
          {
            content: 'perkele',
            title: this.getSamuraiName() + ' first roll!',
            color: this.HEXToVBColor(this.getColor()),
            description: (this.$store.state.mainRoll.dc !== undefined && this.$store.state.mainRoll.dc !== '' ? ((this.$store.state.mainRoll.dc <= this.$store.state.mainRoll.success) ? 'Bushi overcomes challenge!' : 'Bushi is unsuccessful in his/her attempt') + '\n\n' : '')
                + 'Samurai used ring of: ' + this.$store.state.mainRoll.selectedRing + '(' + this.$store.state.mainRoll.selectedRingValue + ')' + '\n'
                + 'Samurai used skill of: ' + this.$store.state.mainRoll.selectedSkill + '(' + this.$store.state.mainRoll.selectedSkillValue + ')' + '\n\n'
                + (this.$store.state.mainRoll.voidPoints > 0 ? 'Samurai used void points: ' + this.$store.state.mainRoll.voidPoints + '\n\n' : ''),
            image: {
              url: 'attachment://roll.png',
            },
          },
        ],
      }));
      formData.append('file', imageBlob, 'roll.png');

      await axios.post(atob(getHook()), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

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
        return this.$store.state.mainRoll.selectedIds.includes(dice.id);
      }).filter(dice => {
        return explosions.includes(dice.img) && !this.$store.state.mainRoll.explodedHelper.includes(dice.id);
      });

      if (result.length === 0) {
        return;
      }

      const dice = result.pop();
      this.$store.state.mainRoll.explodedHelper.push(dice.id);
      let rand;
      let id;

      switch (dice.img) {
        case 'blacket.png':
          rand = await randomInt(1, 6)();
          id = this.uuid.v4();

          this.$store.state.mainRoll.bExplodedDices.push({
            id: id,
            img: getBlackImage(rand),
          });
          this.$store.state.mainRoll.selectedIds.push(id);
          this.calculateStats();

          break;
        case 'whitee.png':
        case 'whiteeo.png':
        case 'whiteet.png':
          rand = await randomInt(1, 12)();
          id = this.uuid.v4();

          this.$store.state.mainRoll.wExplodedDices.push({
            id: id,
            img: getWhiteImage(rand),
          });
          this.$store.state.mainRoll.selectedIds.push(id);
          this.calculateStats();

          break;
      }

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

      localStorage.setItem('mainRoll', JSON.stringify(this.$store.state.mainRoll));
    },
    finishReroll: function (selected: string | null) {
      this.$store.state.mainRoll.wDices.filter((dice: Dice) => this.$store.state.mainRoll.selectedToRerollIds.includes(dice.id)).forEach(async (dice: Dice) => {
        let result = await randomInt(1, 12)();

        dice.img = getWhiteImage(result);
      });
      this.$store.state.mainRoll.bDices.filter((dice: Dice) => this.$store.state.mainRoll.selectedToRerollIds.includes(dice.id)).forEach(async (dice: Dice) => {
        let result = await randomInt(1, 6)();

        dice.img = getBlackImage(result);
      });

      if (sendNotifications()) {
        const hook = atob(getHook());

        fetch(hook + '/slack', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            attachments: [
              {
                fields: [],
                title: this.getSamuraiName(),
                color: this.getColor(),
                text: 'Bushi makes a reroll of his/her ' + this.$store.state.mainRoll.selectedToRerollIds.length + ' dices due to: ' + selected,
              },
            ],
            ...getKami(this.$store?.state?.kami, true),
          }),
        });
      }

      this.$store.state.mainRoll.selectedToRerollIds = [];
      this.$store.state.mainRoll.rerollStarted = false;
      localStorage.setItem('mainRoll', JSON.stringify(this.$store.state.mainRoll));
    },
    selectToReroll: function (val: Dice) {
      if (this.$store.state.mainRoll.selectedToRerollIds.includes(val.id)) {
        this.$store.state.mainRoll.selectedToRerollIds = this.$store.state.mainRoll.selectedToRerollIds.filter((id: string) => id !== val.id);

        return;
      }

      this.$store.state.mainRoll.selectedToRerollIds.push(val.id);
      localStorage.setItem('mainRoll', JSON.stringify(this.$store.state.mainRoll));
    },
    selectRerollOptions: function (val: string) {
      switch (val.toLowerCase()) {
        case 'ability':
          //@ts-ignore
          this.$store.state.mainRoll.selectedRerollOptionList = this.localPlayer.abilities.map((item: Ability) => item.name);
          break;
        case 'anxiety':
          //@ts-ignore
          this.$store.state.mainRoll.selectedRerollOptionList = this.localPlayer.anxieties.map((item: PersonalTrait) => item.name);
          break;
        case 'adversity':
          //@ts-ignore
          this.$store.state.mainRoll.selectedRerollOptionList = this.localPlayer.adversities.map((item: PersonalTrait) => item.name);
          break;
        case 'distinction':
          //@ts-ignore
          this.$store.state.mainRoll.selectedRerollOptionList = this.localPlayer.distinctions.map((item: PersonalTrait) => item.name);
          break;
        case 'advantage':
          //@ts-ignore
          this.$store.state.mainRoll.selectedRerollOptionList = this.localPlayer.advantages.map((item: Advantage) => item.name);
          break;
        case 'disadvantage':
          //@ts-ignore
          this.$store.state.mainRoll.selectedRerollOptionList = this.localPlayer.disadvantages.map((item: Advantage) => item.name);
          break;
      }

      this.$store.state.mainRoll.selectedRerollReasonOption = null;
    },
    startRerollDisabled: function (val: string | null) {
      return !this.$store.state.mainRoll.isDuringRoll
          || this.$store.state.mainRoll.selectedIds.length > 0
          || val === null
          || this.$store.state.mainRoll.selectedRerollOptionList.length <= 0
          || this.$store.state.mainRoll.rerollStarted
          || this.$store.state.mainRoll.rerollLock.includes(val);
    },
    finishRerollDisabled: function (val: string | null) {

      return !this.$store.state.mainRoll.isDuringRoll
          || this.$store.state.mainRoll.selectedIds.length > 0
          || val === null
          || this.$store.state.mainRoll.selectedRerollOptionList.length <= 0
          || this.$store.state.mainRoll.rerollStarted === false
          || this.$store.state.mainRoll.currentReroll !== val;
    },
    canRoll: function () {
      return this.$store.state.mainRoll.isDuringRoll
          || ('isLoaded' in this.localPlayer && !this.localPlayer.isLoaded && this.npc === false)
          || this.$store.state.mainRoll.selectedRing === 'none'
          || this.$store.state.mainRoll.rerollStarted;
    },
    selectDice: function (val: Dice) {
      if (this.$store.state.mainRoll.isDuringRoll === false) {
        return;
      }

      if (this.$store.state.mainRoll.rerollStarted) {
        this.selectToReroll(val);

        return;
      }

      if (this.$store.state.mainRoll.isExplosionStarted) {
        const merged = [
          ...this.$store.state.mainRoll.wExplodedDices,
          ...this.$store.state.mainRoll.bExplodedDices,
        ].map(item => item.id);

        if (!merged.includes(val.id) || this.$store.state.mainRoll.explodedHelper.includes(val.id)) {
          return;
        }
      }

      if (this.$store.state.mainRoll.selectedIds.includes(val.id)) {
        this.$store.state.mainRoll.selectedIds = this.$store.state.mainRoll.selectedIds.filter((id: string) => id !== val.id);
        this.calculateStats();

        return;
      }

      const modifier = this.$store.state.mainRoll.selectedIds.filter((id: string) => this.$store.state.mainRoll.voidDicesHelper.includes(id));

      if (
          !this.$store.state.mainRoll.isExplosionStarted
          && this.$store.state.mainRoll.selectedIds.length - modifier.length >= this.$store.state.mainRoll.selectedRingValue
          && !this.$store.state.mainRoll.voidDicesHelper.includes(val.id)
      ) {
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
    getSamuraiName: function (): string {
      if ('familyData' in this.localPlayer) {
        return this.localPlayer.familyData.clan + ' ' + this.localPlayer.familyData.name + ' from ' + this.localPlayer.familyData.mon;
      }

      return this.localPlayer.name;
    },
    sendResultDiscord: async function () {
      if (this.$store.state.mainRoll.isDuringRoll === false) {
        return;
      }
      this.isSendingResult = true;

      this.calculateStats();

      const dices: string[] = [];

      [
        ...this.$store.state.mainRoll.wDices,
        ...this.$store.state.mainRoll.wExplodedDices,
        ...this.$store.state.mainRoll.bDices,
        ...this.$store.state.mainRoll.bExplodedDices,
      ].filter(dice => {
        return this.$store.state.mainRoll.selectedIds.includes(dice.id);
      }).forEach((dice) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        dices.push(require('../../assets/img/mini/' + dice.img));
      });

      const b64 = await mergeImages(dices, {color: '#f000'});
      const formData = new FormData();
      let imageBlob = await (await fetch(b64)).blob();

      let description = '';

      if (this.$store.state.mainRoll.dc !== undefined && this.$store.state.mainRoll.dc !== '' && this.$store.state.mainRoll.dc > 0) {
        description = 'TN of a roll: ' + this.$store.state.mainRoll.dc + '\n';
      } else {
        description = this.npc ? 'GM hide NPC TN \n' : 'TN is unknown - player gets 1 void point \n';
      }

      const bushi = this.npc ? 'NPC' : 'Bushi';

      if (this.$store.state.mainRoll.dc <= this.$store.state.mainRoll.success && this.$store.state.mainRoll.dc !== undefined && this.$store.state.mainRoll.dc !== '') {
        description += bushi + ' overcomes challenge!' + '\n\n';
      } else if (this.$store.state.mainRoll.dc !== undefined && this.$store.state.mainRoll.dc !== '') {
        description += bushi + ' is unsuccessful in his/her attempt' + '\n\n';
      }

      formData.append('payload_json', JSON.stringify({
        ...getKami(this.$store?.state?.kami),
        embeds: [
          {
            content: 'perkele',
            title: this.getSamuraiName() + ' resolved a roll!',
            color: this.HEXToVBColor(this.getColor()),
            description: description
                + 'Success: ' + this.$store.state.mainRoll.success + '\n'
                + 'Strife: ' + this.$store.state.mainRoll.strife + '\n'
                + 'Opportunities: ' + this.$store.state.mainRoll.opportunities + '\n',
            image: {
              url: 'attachment://roll.png',
            },
          },
        ],
      }));
      formData.append('file', imageBlob, 'roll.png');

      await axios.post(atob(getHook()), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (this.$store.state.mainRoll.dc === undefined || this.$store.state.mainRoll.dc === '' || this.$store.state.mainRoll.dc <= 0) {
        this.localPlayer.currentStats.voidPoints = parseInt(this.localPlayer.currentStats.voidPoints.toString()) + 1;
      }

      if (
          Array.isArray(this.localPlayer.rings)
          && this.localPlayer.rings !== undefined
          // @ts-ignore
          && this.localPlayer.currentStats.voidPoints > this.localPlayer.rings.filter((val: Ring) => val.name === 'Void').shift().value
      ) {
        // @ts-ignore
        this.localPlayer.currentStats.voidPoints = this.localPlayer.rings.filter((val: Ring) => val.name === 'Void').shift().value;
      }

      this.localPlayer.currentStats.composure = this.localPlayer.currentStats.composure - this.$store.state.mainRoll.strife;
      this.localPlayer.currentStats.voidPoints = this.localPlayer.currentStats.voidPoints - this.$store.state.mainRoll.voidPoints;

      if (this.localPlayer.currentStats.composure < 0){
        this.localPlayer.currentStats.composure = 0;
      }

      this.$store.state.mainRoll.isDuringRoll = false;
      this.$store.state.mainRoll.isExplosionStarted = false;
      this.$store.state.mainRoll.totalExplosions = 0;
      this.$store.state.mainRoll.voidPoints = 0;
      this.$store.state.mainRoll.explodedHelper = [];
      this.$store.state.mainRoll.rerollLock = [];

      localStorage.setItem('mainRoll', JSON.stringify(this.$store.state.mainRoll));
      if (!this.npc) {
        localStorage.setItem('player', JSON.stringify(this.localPlayer));
      }

      this.isSendingResult = false;
    },
    getColor: function () {
      if ('familyData' in this.localPlayer) {
        return getClanColor(this.localPlayer.familyData.clan);
      }

      return getClanColor('');
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
        return this.$store.state.mainRoll.selectedIds.includes(dice.id);
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
        return this.$store.state.mainRoll.selectedIds.includes(dice.id);
      }).filter(dice => {
        return explosions.includes(dice.img);
      }).length;
    },
  },
});
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