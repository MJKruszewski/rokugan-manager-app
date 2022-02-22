<template>
  <v-col :md="12">
    <input
        id="openGmPlayerXml"
        ref="openGmPlayerXml"
        type="file"
        accept=".xml" multiple
        @change="onFileChanged"
        style="display: none"
    >
    <v-card
        :dark="this.$store.state.colorVariant"
        :text-variant="this.$store.state.textVariant"
    >
      <v-card-title style="justify-content: space-between;">
        <b>Players:</b>
        <v-btn
            color="info"
            dark
            v-on:click="importXmls"
        >
          Import
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <template v-for="player in players">
            <v-col :key="player.name" :md="3" :sm="6">
              <v-card
                  class="mx-auto my-12"
                  max-width="374"

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

                <v-card-title>{{ player.familyData.name }} {{ player.familyData.mon }}</v-card-title>

                <v-card-text>
                </v-card-text>


                <v-card-actions>
                  <v-btn
                      outlined
                      rounded
                      text
                      v-on:click="$router.push({
                            path: '/gmpanel-player/' + players.indexOf(player),
                          })"
                  >
                    Details
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </template>

        </v-row>
      </v-card-text>

    </v-card>
  </v-col>
</template>
<script lang="ts">
import {Player} from '@/domain/types/player.type';
import {LoadCardService} from '@/domain/services/load-card.service';
import Vue from 'vue';
export default Vue.extend({
  name: 'GmPlayersList',
  data: () => {
    return {
      xmlFiles: undefined,
      players: new Array<Player>(),
    };
  },
  beforeMount() {
    this.players = this.$store.state.gmData.players;
  },
  watch: {
    xmlFiles: async function (val) {
      if (val === undefined || val === '') {
        return;
      }

      this.players = [];

      for (const tmp of val) {
        const xml = new DOMParser().parseFromString(await tmp.text(), 'application/xml');
        this.players.push(await LoadCardService.importCard(xml, false));
      }

      this.$store.state.gmData.players = this.players;
    },
  },
  methods: {
    getAvatar: function (player: Player) {
      if (player === undefined) {
        return '';
      }

      return 'data:image/png;charset=utf-8;base64,' + player.portraitImage;
    },
    onFileChanged: function (file: File | null) {
      if (file === null) {
        return;
      }

      //@ts-ignore
      this.xmlFiles = file?.target?.files;
    },
    importXmls: function () {
      //@ts-ignore
      this.$refs.openGmPlayerXml?.click();
    },
  },
});
</script>
