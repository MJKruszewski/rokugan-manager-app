<template>
  <v-row>
    <v-col cols="12" md="7">
      <v-row>
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
              class="container-color"
          >
            <v-card-title>
              <b>Rings:</b>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="this.player !== undefined">
              <v-data-table
                  class="elevation-4"
                  disable-pagination
                  hide-default-footer
                  single-select
                  hide-default-header
                  :headers="[
                           {text: 'Name', value: 'name', width: 50},
                           {text: 'Description', value: 'description'},
                           {text: 'Value', value: 'value'},
                        ]"
                  :dark="this.$store.state.colorVariant"
                  :items="this.player.rings"
              >
                <template v-slot:[`item.name`]="{ item }">
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-img v-bind="attrs"
                             v-on="on"
                             :id="item.name.toLowerCase() + '-ring'"
                             width="55px"
                             :src="require('../../assets/img/ring/' + item.name.toLowerCase() + '.png')"/>
                    </template>
                    <span>{{ getLocalStanceTooltip(item.name.toLowerCase()) }}</span>
                  </v-tooltip>
                </template>
                <template v-slot:[`item.description`]="{ item }">
                  <b>{{ getDescriptionRing(item.name) }}</b>
                </template>
                <template v-slot:[`item.value`]="{ item }">
                  <b>{{item.value}}</b>
                </template>
              </v-data-table>
            </v-card-text>
            <v-card-text v-else>
              <v-skeleton-loader
                  type="table"
              ></v-skeleton-loader>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
          >
            <v-card-title style="justify-content: space-between;">
              <b>Story:</b>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="player !== undefined">
              <v-textarea
                  label="Ninjo (Personal Desire):"
                  auto-grow
                  filled
                 :value="player.story.ninjo"
              ></v-textarea>
              <v-textarea
                  label="Giri (Sworn Duty):"
                  auto-grow
                  filled
                 :value="player.story.giri"
              ></v-textarea>
            </v-card-text>
            <v-card-text v-else>
              <v-skeleton-loader type="table"></v-skeleton-loader>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
              class="container-color"
          >
            <v-card-title>
              <b>Skills:</b>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="player === undefined">
              <v-skeleton-loader
                  type="table"
              ></v-skeleton-loader>
            </v-card-text>
            <v-card-text class="text-center" v-else>
              <v-data-table
                  class="elevation-4"
                  :dark="this.$store.state.colorVariant"
                  disable-pagination
                  dense
                  hide-default-footer
                  single-select
                  hide-default-header
                  :headers="[
                           {text: 'Name', value: 'name'},
                           {text: 'Group', value: 'group', },
                           {text: 'Value', value: 'value'},
                        ]"
                  group-by="group"
                  :items="player.skills"
              ></v-data-table>
            </v-card-text>

          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="5">
      <v-row>
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
          >
            <v-card-title style="justify-content: space-between;">
              <b>Attributes:</b>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="player !== undefined">
              <v-row>
                <v-col>
                  <v-text-field
                      label="Endurance:"
                      disabled
                     :value="player.stats.endurance"
                      placeholder="0"
                  />
                  <v-text-field
                      label="Composure:"
                      disabled
                     :value="player.stats.composure"
                      placeholder="0"
                  />
                  <v-text-field
                      label="Vigilance:"
                      disabled
                     :value="player.stats.vigilance"
                      placeholder="0"
                  />
                  <v-text-field
                      label="Focus:"
                      disabled
                      :value="player.stats.focus"
                      placeholder="0"
                  />
                </v-col>
                <v-col>
                  <v-slider
                      label="Glory:"
                     :value="player.social.glory"
                      :thumb-size="24"
                      thumb-color="blue"
                      color="blue"
                      min="0"
                      max="100"
                      thumb-label="always"
                  ></v-slider>
                  <v-slider
                      label="Honor:"
                     :value="player.social.honor"
                      :thumb-size="24"
                      thumb-color="blue"
                      color="blue"
                      min="0"
                      max="100"
                      thumb-label="always"
                  ></v-slider>
                  <v-slider
                      label="Status:"
                     :value="player.social.status"
                      :thumb-size="24"
                      thumb-color="blue"
                      color="blue"
                      min="0"
                      max="100"
                      thumb-label="always"
                  ></v-slider>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-else>
              <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
          >
            <v-card-title style="justify-content: space-between;">
              <b>Bonds:</b>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="player !== undefined">
              <v-data-table
                  class="elevation-4"
                  disable-pagination
                  hide-default-footer
                  show-select
                  single-select
                  item-key="id"
                  v-model="bondSelect"
                  :headers="bondsHeaders"
                  :dark="this.$store.state.colorVariant"
                  :items="this.getBonds()"
              >
                <template v-slot:[`item.book`]="{ item }">
                  <OpenBookComponent :item="item"/>
                </template>
              </v-data-table>
            </v-card-text>
            <v-card-text v-else>
              <v-skeleton-loader type="table"></v-skeleton-loader>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
          >
            <v-card-title style="justify-content: space-between;">
              <b>Notes:</b>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="player !== undefined">
              <v-textarea
                  label="Notes:"
                  rows="15"
                  filled
                 :value="player.story.note"
              ></v-textarea>
            </v-card-text>
            <v-card-text v-else>
              <v-skeleton-loader type="table"></v-skeleton-loader>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import OpenBookComponent from '@/components/OpenBookComponent.vue';
import {Bond, Player} from '@/domain/types/player.type';
import {getRingDescription, getStanceTooltip} from '@/domain/common';

export default Vue.extend({
  name: 'PlayerDetailsPage',
  components: {
    OpenBookComponent,
  },
  props: {
    id: String,
  },
  beforeMount() {
    this.player = this.$store.state.gmData.players[this.id];
  },
  data: () => {
    return {
      player: {

      },
      bondSelect: [],
      bondsHeaders: [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Rank',
          value: 'rank',
        },
        {
          text: 'Book',
          value: 'book',
        },
      ],
    };
  },
  methods: {

    getLocalStanceTooltip: function (stance: string) {
      return getStanceTooltip(stance);
    },
    getDescriptionRing: function (ring: string) {
      return getRingDescription(ring);
    },
    getBonds() {
      if (this.player === undefined) {
        return [];
      }

      // @ts-ignore
      return this.player?.bonds?.map((item: Bond, index: number) => {
        return {
          ...item,
          id: index,
        };
      });
    },
  },
});
</script>

<style scoped>

</style>