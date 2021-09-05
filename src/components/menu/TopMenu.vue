<template>
  <v-app-bar app dense :dark="this.$store.state.colorVariant">
    <input
        id="openXml"
        ref="openXml"
        type="file"
        accept=".xml"
        @change="onFileChanged"
        style="display: none"
    >
    <v-img :src="this.getClanImage()" max-width="35px"></v-img>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>
            mdi-file
          </v-icon>
        </v-btn>
      </template>

      <v-list :dark="this.$store.state.colorVariant">
        <v-list-item link disabled>
          <v-list-item-title>New</v-list-item-title>
        </v-list-item>
        <v-list-item link disabled>
          <v-list-item-title>Open</v-list-item-title>
        </v-list-item>
        <v-list-item link disabled>
          <v-list-item-title>Save</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>
            mdi-tools
          </v-icon>
        </v-btn>
      </template>

      <v-list :dark="this.$store.state.colorVariant">
        <v-list-item link disabled>
          <v-list-item-title>Open application data folder</v-list-item-title>
        </v-list-item>
        <v-list-item link v-on:click="loadXml()">
          <v-list-item-title>Import XML</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>
            mdi-arm-flex
          </v-icon>
        </v-btn>
      </template>

      <v-list :dark="this.$store.state.colorVariant">
        <v-list-item link v-on:click="$router.push('gmpanel')">
          <v-list-item-title>GM Panel</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-spacer></v-spacer>

    <v-btn v-if="!isElectron()" color="success" v-on:click="openGithub()">Download</v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>
            mdi-discord
          </v-icon>
        </v-btn>
      </template>

      <v-list :dark="this.$store.state.colorVariant">
        <template v-for="server in $store.state.server.hostList">
          <v-list-item link :key="server.text + uuid.v4()" v-on:click="saveHook(server.value)">
            <v-list-item-title>
              <v-icon v-if="$store.state.server.host === server.value">mdi-chevron-right</v-icon>
              {{server.text}}
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import {getClanColor, getClanMon, getHook} from '@/domain/common';
import {LoadCardService} from '@/domain/services/load-card.service';

export default Vue.extend({
  name: 'TopMenu',
  data: () => {
    return {
      uuid: require('uuid'),
      selectedMenu: 0,
      xmlFile: undefined,
      hook: getHook(),
      clipped: true,
    };
  },
  watch: {
    xmlFile: async function (val) {
      if (val === undefined || val === '') {
        return;
      }

      const xml = new DOMParser().parseFromString(await val.text(), 'application/xml');
      this.$store.state.player = await LoadCardService.importCard(xml);

    },
  },
  methods: {
    onFileChanged: function (file: File | null) {
      if (file === null) {
        return;
      }

      //@ts-ignore
      this.xmlFile = file?.target?.files[0];
    },
    isElectron: function (): boolean {
      return navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;
    },
    loadXml: function () {
      //@ts-ignore
      this.$refs.openXml?.click();
    },
    saveHook: function (host: string) {
      this.$store.state.server.host = host;

      localStorage.setItem('server', JSON.stringify(this.$store.state.server));
    },
    getClanImage: function () {
      console.log('getClanMon(this.$store.state.player.familyData.clan)', getClanMon(this.$store.state.player?.familyData?.clan));
      return getClanMon(this.$store.state.player?.familyData?.clan);
    },
    getColor: function () {
      return getClanColor(this.$store.state.player?.familyData?.clan);
    },
    openGithub: function () {
      window.open('https://github.com/MJKruszewski/rokugan-manager-app/releases', '_blank');
    },
  },
});
</script>

<style scoped>

</style>