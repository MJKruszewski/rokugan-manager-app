<template>
  <v-col :md="12">
    <input
        id="openGmNpcXml"
        ref="openGmNpcXml"
        type="file"
        accept=".rokugan.json"
        @change="onFileChanged"
        style="display: none"
    >
    <v-card
        :dark="this.$store.state.colorVariant"
        :text-variant="this.$store.state.textVariant"
    >
      <v-card-title style="justify-content: space-between;">
        <b>Npc:</b>
        <div>
          <AddNpc :edit="false" :npc="null"/>
          &nbsp;
          <v-btn
              color="info"
              dark
              v-on:click="importXmls"
          >
            Import
          </v-btn>
          &nbsp;
          <v-btn
              color="success"
              dark
              v-on:click="exportJson"
          >
            Export
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <v-row>
          <template v-for="player in npcs">
            <v-col :key="player.id" :md="3" :sm="12">
              <v-card
                  class="mx-auto my-12"
              >
                <template slot="progress">
                  <v-progress-linear
                      color="deep-purple"
                      height="10"
                      indeterminate
                  ></v-progress-linear>
                </template>

                <v-img
                    style="border-radius: 5px;min-height: 350px;max-height: 350px"
                    :src="getAvatar(player)"
                ></v-img>

                <v-card-title>{{ player.name }}</v-card-title>

                <v-card-text>
                  <v-btn
                      color="red"
                      rounded
                      v-on:click="deleteNpc(player.id)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                  &nbsp;
                  <AddNpc :edit="true" :npc="player" v-on:refresh="refresh"/>
                  &nbsp;
                  <v-btn
                      outlined
                      rounded
                      v-on:click="$router.push({
                            path: '/gmpanel-npc/' + npcs.indexOf(player),
                          })"
                  >
                    <v-icon>mdi-account-details</v-icon>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </template>

        </v-row>
      </v-card-text>

    </v-card>
  </v-col>
</template>
<script lang="ts">
import {Npc, Player} from '@/domain/types/player.type';
import {LoadCardService} from '@/domain/services/load-card.service';
import AddNpc from '@/components/gm-panel/AddNpc.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'GmNpcList',
  components: {AddNpc},
  data: () => {
    return {
      npcs: new Array<Npc>(),
    };
  },
  beforeMount() {
    this.npcs = this.$store.state.gmData.npcs;
  },
  methods: {
    deleteNpc: function(id: string) {
      this.$store.state.gmData.npcs = this.$store.state.gmData.npcs.filter((item: Npc) => item.id !== id);
      this.npcs = this.$store.state.gmData.npcs;
    },
    refresh: function () {
      this.npcs = [];
      this.npcs = this.$store.state.gmData.npcs;
    },
    getAvatar: function (player: Npc) {
      if (player === undefined || player.portraitImage === undefined || player.portraitImage.length <= 0) {
        return require('../../assets/img/npc/placeholder.jpg');
      }

      return 'data:image/png;charset=utf-8;base64,' + player.portraitImage;
    },
    onFileChanged: async function (file: File | null) {
      if (file === null) {
        return;
      }

      //@ts-ignore
      this.$store.state.gmData.npcs = JSON.parse(await file?.target?.files[0].text());
      this.npcs = this.$store.state.gmData.npcs;
    },
    importXmls: function () {
      //@ts-ignore
      this.$refs.openGmNpcXml?.click();
    },
    exportJson: function () {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.$store.state.gmData.npcs));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute('href',     dataStr);
      downloadAnchorNode.setAttribute('download', 'l5r_gm_data.rokugan.json');
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },
  },
});
</script>
