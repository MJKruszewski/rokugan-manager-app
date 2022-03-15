<template>
  <v-card
      :dark="this.$store.state.colorVariant"
      :text-variant="this.$store.state.textVariant"
      class="container-color"
  >
    <v-card-title style="justify-content: space-between;">
      <b>Samurai status:</b>
      <v-btn color="info" v-on:click="sendInfo()" :disabled="this.$store.state.player === undefined">Send</v-btn>

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
import {getClanColor, getHook, getKami, HEXToVBColor} from '@/domain/common';
import Vue from 'vue';
import {Ring} from '@/domain/types/ring.type';
import {Player} from '@/domain/types/player.type';
import axios from 'axios';
//@ts-ignore
import mergeImages from 'merge-images-horizontally-with-text/dist/index.es2015';

export default Vue.extend({
  name: 'SamuraiStatus',
  data: () => {
    return {
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
              title: playerStore.familyData.clan + ' ' + playerStore.familyData.name + ' from ' + playerStore.familyData.mon,
              color: this.getColor(),
              text: 'Bends under pressure! (Unmasking)',
            },
          ],
          ...getKami(this.$store?.state?.kami, true),
        }),
      });
    },
  },
  methods: {
    getColor: function () {
      return getClanColor(this.$store.state.player.familyData.clan);
    },
    sendInfo: async function () {
      const playerStore: Player = this.$store.state.player;
      const formData = new FormData();
      let image = {};

      if (this.$store.state.player.portraitImage !== undefined && this.$store.state.player.portraitImage.length > 0) {
        let imageBlob = await (await fetch('data:image/png;charset=utf-8;base64,' + this.$store.state.player.portraitImage)).blob();
        image = {
          image: {
            url: 'attachment://player.png',
          },
        };
        formData.append('files[0]', imageBlob, 'player.png');
      }

      formData.append('payload_json', JSON.stringify({
        ...getKami(this.$store?.state?.kami),
        embeds: [
          {
            content: 'perkele',
            title: 'Status of ' + playerStore.familyData.name + ' from ' + playerStore.familyData.mon,
            color: HEXToVBColor(this.getColor()),
            description: 'Endurance: ' + playerStore.currentStats.endurance + '/' + playerStore.stats.endurance + '\n'
                + 'Composure: ' + playerStore.currentStats.composure + '/' + playerStore.stats.composure + '\n'
                + 'Void points: ' + playerStore.currentStats.voidPoints + '/' + this.$store.state.player.rings.filter((val: Ring) => val.name === 'Void').shift().value + '\n\n',
            ...image,
          },
        ],
      }));

      await axios.post(atob(getHook()), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
  },
});
</script>

<style scoped>

</style>