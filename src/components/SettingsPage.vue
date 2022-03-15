<template>
  <v-row>
    <v-col v-if="isElectron()">
      <v-row>
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
          >
            <v-card-title style="justify-content: space-between;">
              <b>Books file paths:</b>
            </v-card-title>
            <v-divider/>

            <v-card-text>
              <v-select
                  label="Kami"
                  v-model="$store.state.kami"
                  :items="['Bayushi', 'Doji', 'Fu Leng', 'Shiba', 'Hida', 'Akodo', 'Yotogi']"
                  required
                  style="max-width: 150px"
              ></v-select>
              <v-file-input
                label="Core Rules Book:"
                placeholder="Select your file"
                accept=".pdf"
                v-model="Core"
              ></v-file-input>
              <v-file-input
                label="Celestial Realms:"
                placeholder="Select your file"
                accept=".pdf"
                v-model="CR"
              ></v-file-input>
              <v-file-input
                label="Court of Stone:"
                placeholder="Select your file"
                accept=".pdf"
                v-model="CoS"
              ></v-file-input>
              <v-file-input
                label="Deathly Turns:"
                placeholder="Select your file"
                accept=".pdf"
                v-model="DT"
              ></v-file-input>
              <v-file-input
                label="Emerald Empire:"
                placeholder="Select your file"
                accept=".pdf"
                v-model="EE"
              ></v-file-input>
              <v-file-input
                label="Fields of Victory:"
                placeholder="Select your file"
                accept=".pdf"
                v-model="FoV"
              ></v-file-input>
              <v-file-input
                label="Game Master's Kit:"
                placeholder="Select your file"
                accept=".pdf"
                v-model="GMK"
              ></v-file-input>
              <v-file-input
                label="Mantis"
                placeholder="Select your file"
                accept=".pdf"
                v-model="Mantis"
              ></v-file-input>
              <v-file-input
                label="Path of Waves:"
                placeholder="Select your file"
                accept=".pdf"
                v-model="PoW"
              ></v-file-input>
              <v-file-input
                label="Shadowlands:"
                placeholder="Select your file"
                accept=".pdf"
                v-model="SL"
              ></v-file-input>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col>
      <v-row>
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
          >
            <v-card-title style="justify-content: space-between;">
              <b>Discord servers:</b>
            </v-card-title>
            <v-divider/>

            <v-card-text>
              <v-row>
                <v-col>
                  <v-select
                      label=""
                      :items="$store.state.server.hostList"
                      v-model="selectedHook"
                  />
                </v-col>
                <v-col cols="3">
                  <v-btn
                      color="warning"
                      :disabled="selectedHook === null"
                      v-on:click="removeServer()"
                  >Remove</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                      label="Discord server name:"
                      v-model="newServerName"
                  />
                  <v-text-field
                      label="Discord webhook:"
                      v-model="newServerWebhook"
                  />
                  <v-btn color="success"
                         :disabled="newServerName === null || newServerWebhook === null || newServerName.lenght <= 0 || newServerWebhook.lenght <= 0 "
                    v-on:click="addServer()"
                  >Add</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue';
import {Book} from '@/domain/types/player.type';

export default Vue.extend({
  name: 'SettingsPage',
  data: function() {
    return {
      selectedHook: null,
      newServerName: null,
      newServerWebhook: null,


      CR: this.$store.state.server.bookFiles.CR ? {
        name: this.$store.state.server.bookFiles.CR,
        path: this.$store.state.server.bookFiles.CR,
      } : null,
      CoS: this.$store.state.server.bookFiles.CoS ? {
        name: this.$store.state.server.bookFiles.CoS,
        path: this.$store.state.server.bookFiles.CoS,
      } : null,
      Core: this.$store.state.server.bookFiles.Core ? {
        name: this.$store.state.server.bookFiles.Core,
        path: this.$store.state.server.bookFiles.Core,
      } : null,
      DT: this.$store.state.server.bookFiles.DT ? {
        name: this.$store.state.server.bookFiles.DT,
        path: this.$store.state.server.bookFiles.DT,
      } : null,
      EE: this.$store.state.server.bookFiles.EE ? {
        name: this.$store.state.server.bookFiles.EE,
        path: this.$store.state.server.bookFiles.EE,
      } : null,
      FoV: this.$store.state.server.bookFiles.FoV ? {
        name: this.$store.state.server.bookFiles.FoV,
        path: this.$store.state.server.bookFiles.FoV,
      } : null,
      GMK: this.$store.state.server.bookFiles.GMK ? {
        name: this.$store.state.server.bookFiles.GMK,
        path: this.$store.state.server.bookFiles.GMK,
      } : null,
      Mantis: this.$store.state.server.bookFiles.Mantis ? {
        name: this.$store.state.server.bookFiles.Mantis,
        path: this.$store.state.server.bookFiles.Mantis,
      } : null,
      PoW: this.$store.state.server.bookFiles.PoW ? {
        name: this.$store.state.server.bookFiles.PoW,
        path: this.$store.state.server.bookFiles.PoW,
      } : null,
      SL: this.$store.state.server.bookFiles.SL ? {
        name: this.$store.state.server.bookFiles.SL,
        path: this.$store.state.server.bookFiles.SL,
      } : null,
    };
  },
  watch: {
    CR: function(file) {
      this.saveFile('CR', file);
    },
    CoS: function(file) {
      this.saveFile('CoS', file);
    },
    Core: function(file) {
      this.saveFile('Core', file);
    },
    DT: function(file) {
      this.saveFile('DT', file);
    },
    EE: function(file) {
      this.saveFile('EE', file);
    },
    FoV: function(file) {
      this.saveFile('FoV', file);
    },
    GMK: function(file) {
      this.saveFile('GMK', file);
    },
    Mantis: function(file) {
      this.saveFile('Mantis', file);
    },
    PoW: function(file) {
      this.saveFile('PoW', file);
    },
    SL: function(file) {
      this.saveFile('SL', file);
    },
  },
  methods: {
    removeServer: function () {
      if (this.selectedHook === null) {
        return;
      }

      //@ts-ignore
      this.$store.state.server.hostList = this.$store.state.server.hostList.filter(server => server.value !== this.selectedHook);

      this.selectedHook = null;
      localStorage.setItem('server', JSON.stringify(this.$store.state.server));
    },
    addServer: function () {
      if (this.newServerName === null || this.newServerWebhook === null) {
        return;
      }

      this.$store.state.server.hostList.push({
        text: this.newServerName,
        //@ts-ignore
        value: btoa(unescape(encodeURIComponent(this.newServerWebhook))),
      });

      this.newServerName = null;
      this.newServerWebhook = null;
      localStorage.setItem('server', JSON.stringify(this.$store.state.server));
    },
    saveFile: function (book: Book, file: File | null) {
      console.log('change of file', file);

      this.$store.state.server.bookFiles[book] = file === null ? file : file.path;

      localStorage.setItem('server', JSON.stringify(this.$store.state.server));
    },
    isElectron: function (): boolean {
      return navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;
    },
  },
});
</script>

<style scoped>

</style>