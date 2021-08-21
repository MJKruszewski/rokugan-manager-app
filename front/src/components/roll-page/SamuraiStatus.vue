<template>
  <v-card
      :dark="this.$store.state.colorVariant"
      :text-variant="this.$store.state.textVariant"
      class="container-color"
  >
    <v-card-title style="justify-content: space-between;">
      <b>Samurai status:</b>
      <v-btn variant="info" v-on:click="sendInfo()" :disabled="this.$store.state.player === undefined">Send</v-btn>

    </v-card-title>
    <v-divider/>

    <v-card-text v-if="$store.state.player !== undefined">
      <v-row>
        <v-col cols="12">
          <v-slider
              label="Endurance:"
              v-model="$store.state.player.currentStats.endurance"
              :thumb-size="24"
              thumb-color="blue"
              color="blue"
              min="0"
              :max="$store.state.player.stats.endurance"
              thumb-label="always"
          ></v-slider>
        </v-col>
        <v-col cols="12">
          <v-slider
              label="Composure:"
              thumb-color="blue"
              color="blue"
              v-model="$store.state.player.currentStats.composure"
              :thumb-size="24"
              min="0"
              :max="$store.state.player.stats.composure"
              thumb-label="always"
          ></v-slider>
        </v-col>
        <v-col cols="12">
          <v-slider
              label="Void points:"
              thumb-color="blue"
              color="blue"
              v-model="$store.state.player.currentStats.voidPoints"
              :thumb-size="24"
              min="0"
              :max="$store.state.player.rings.filter(val => val.name === 'Void').shift().value"
              thumb-label="always"
          ></v-slider>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text v-else>
      <v-skeleton-loader type="article, actions"></v-skeleton-loader>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {getClanColor, getHook} from '@/domain/common';
import Vue from 'vue';
import {Ring} from '@/domain/types/ring.type';
import {Player} from '@/domain/types/player.type'; 

export default Vue.extend({
  name: 'SamuraiStatus',
  data: () => {
    return {
      webhook: require('webhook-discord'),
      hook: getHook(),
    };
  },
  computed: {
    comp () {
      return this.$store.state.player?.currentStats?.composure;
    },
    endu () {
      return this.$store.state.player?.currentStats?.endurance;
    },
    void () {
      return this.$store.state.player?.currentStats?.voidPoints;
    },
  },
  watch: {
    void () {
      localStorage.setItem('player', JSON.stringify(this.$store.state.player));
    },
    endu () {
      localStorage.setItem('player', JSON.stringify(this.$store.state.player));
    },
    comp (newCount) {
      localStorage.setItem('player', JSON.stringify(this.$store.state.player));

      if (newCount != 0) {
        return;
      }

      const playerStore = this.$store.state.player;
      const hook = new this.webhook.Webhook(Buffer.from(getHook(), 'base64').toString());
      const msg = new this.webhook.MessageBuilder()
          .setAvatar('https://upload.wikimedia.org/wikipedia/commons/7/70/Scorpion_and_the_frog_kurzon.png')
          .setTitle(playerStore.familyData.clan + ' ' + playerStore.familyData.name + ' from ' + playerStore.familyData.mon)
          .setName('Kami Bayushi')
          .setColor(this.getColor())
          .setDescription('Bends under pressure! (Unmasking)');

      hook.send(msg);
    },
  },
  methods: {
    getColor: function () {
      return getClanColor(this.$store.state.player.familyData.clan);
    },
    sendInfo: function () {
      const playerStore: Player = this.$store.state.player;
      const hook = new this.webhook.Webhook(Buffer.from(getHook(), 'base64').toString());
      const msg = new this.webhook.MessageBuilder()
          .setAvatar('https://upload.wikimedia.org/wikipedia/commons/7/70/Scorpion_and_the_frog_kurzon.png')
          .setTitle('Status of ' + playerStore.familyData.name + ' from ' + playerStore.familyData.mon)
          .setName('Kami Bayushi')
          .setColor(this.getColor())
          .setDescription(
               'Endurance: ' + playerStore.currentStats.endurance + '/' + playerStore.stats.endurance + '\n'
              + 'Composure: ' + playerStore.currentStats.composure + '/' + playerStore.stats.composure + '\n'
              + 'Void points: ' + playerStore.currentStats.voidPoints + '/' + this.$store.state.player.rings.filter((val: Ring) => val.name === 'Void').shift().value + '\n\n',
          );

      hook.send(msg);
    },
  },
});
</script>

<style scoped>

</style>