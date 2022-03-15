<template>
  <v-row v-if="player !== undefined">
    <v-col cols="12" md="6">
      <v-row>
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
              class="container-color"
          >
            <v-card-title style="justify-content: space-between;">
              <b><v-btn
                  dark
                  v-on:click="$router.back()"
              >
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>&nbsp;&nbsp;{{ this.player.name }}</b>
              <div style="display: inline-flex" >
                &nbsp;&nbsp;
                <OpenBookComponent v-if="player.reference !== undefined && player.reference.book !== undefined" :item="player.reference"/>
              </div>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="player !== undefined">
              <v-row justify="space-between">
                <v-col sm="12" md="4">
                  <v-img style="border-radius: 5px;max-height: 400px;min-height: 400px" :src="playerAvatar"/>
                </v-col>
                <v-col sm="12" md="8">
                 <v-row>
                   <v-col sm="12" md="6">
                     <v-text-field
                         label="Name"
                         readonly
                         v-model="player.name"
                         :rules="[v => !!v || 'Field is required',]"
                         required
                     ></v-text-field>
                   </v-col>
                   <v-col sm="12" md="6">
                     <v-text-field
                         label="Demeanor"
                         dark
                         readonly
                         :rules="[v => !!v || 'Field is required',]"
                         v-model="player.demeanor.name"
                         required
                     >
                     </v-text-field>
                   </v-col>
                   <v-col sm="12" md="2">
                     <v-text-field
                         label="Koku"
                         readonly
                         :rules="[v => !(v < 0) || 'Field is required',]"
                         v-model="player.wealth.koku"
                         min="0"
                         required
                     >
                     </v-text-field>
                   </v-col>
                   <v-col sm="12" md="2">
                     <v-text-field
                         label="Bu"
                         readonly
                         :rules="[v => !(v < 0) || 'Field is required',]"
                         v-model="player.wealth.bu"
                         min="0"
                         required
                     >
                     </v-text-field>
                   </v-col>
                   <v-col sm="12" md="2" >
                     <v-text-field
                         label="Zeni"
                         readonly
                         :rules="[v => !(v < 0) || 'Field is required',]"
                         v-model="player.wealth.zeni"
                         min="0"
                         required
                     >
                     </v-text-field>
                   </v-col>
                   <v-col sm="12" md="6">
                     <v-text-field
                         label="Template"
                         readonly
                         v-model="player.template"
                         :rules="[v => !!v || 'Field is required',]"
                         required
                     ></v-text-field>
                   </v-col>
                 </v-row>
                  <v-row justify="space-between">
                    <v-col sm="12" md="2">
                      <v-text-field
                          label="Air"
                          readonly
                          :rules="[v => !(v < 1) || 'Field is required',]"
                          v-model="player.rings.air"
                          min="1"
                          required
                      >
                        <v-img slot="prepend"
                               width="32px"
                               :src="require('../../assets/img/ring/air.png')"/>
                      </v-text-field>
                    </v-col>
                    <v-col sm="12" md="2">
                      <v-text-field
                          label="Fire"
                          :rules="[v => !(v < 1) || 'Field is required',]"
                          readonly
                          v-model="player.rings.fire"
                          min="1"
                          required
                      >
                        <v-img slot="prepend"
                               width="32px"
                               :src="require('../../assets/img/ring/fire.png')"/>
                      </v-text-field>
                    </v-col>
                    <v-col sm="12" md="2">
                      <v-text-field
                          label="Water"
                          readonly
                          :rules="[v => !(v < 1) || 'Field is required',]"
                          v-model="player.rings.water"
                          min="1"
                          required
                      >
                        <v-img slot="prepend"
                               width="32px"
                               :src="require('../../assets/img/ring/water.png')"/>
                      </v-text-field>
                    </v-col>
                    <v-col sm="12" md="2">
                      <v-text-field
                          label="Earth"
                          readonly
                          :rules="[v => !(v < 1) || 'Field is required',]"
                          v-model="player.rings.earth"
                          min="1"
                          required
                      >
                        <v-img slot="prepend"
                               width="32px"
                               :src="require('../../assets/img/ring/earth.png')"/>
                      </v-text-field>
                    </v-col>
                    <v-col sm="12" md="2">
                      <v-text-field
                          label="Void"
                          readonly
                          :rules="[v => !(v < 1) || 'Field is required',]"
                          v-model="player.rings.void"
                          min="1"
                          required
                      >
                        <v-img slot="prepend"
                               width="32px"
                               :src="require('../../assets/img/ring/void.png')"/>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
<br/>
              <v-container>
                <v-row justify="space-between">
                  <v-col sm="12" md="2" class="deep-purple lighten-1">
                    <v-text-field
                        label="Artisan"
                        :rules="[v => !(v < 0) || 'Field is required',]"
                        v-model="player.skills.artisan"
                        min="0"
                        readonly
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col sm="12" md="2" class="green">
                    <v-text-field
                        label="Martial"
                        :rules="[v => !(v < 0) || 'Field is required',]"
                        v-model="player.skills.martial"
                        min="0"
                        readonly
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col sm="12" md="2" class="amber darken-1">
                    <v-text-field
                        label="Scholar"
                        :rules="[v => !(v < 0) || 'Field is required',]"
                        v-model="player.skills.scholar"
                        min="0"
                        readonly
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col sm="12" md="2" class="indigo darken-1">
                    <v-text-field
                        label="Social"
                        readonly
                        :rules="[v => !(v < 0) || 'Field is required',]"
                        v-model="player.skills.social"
                        min="0"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col sm="12" md="2" class="grey darken-3">
                    <v-text-field
                        readonly
                        label="Trade"
                        :rules="[v => !(v < 0) || 'Field is required',]"
                        v-model="player.skills.trade"
                        min="0"
                        required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>

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
              <v-stepper v-model="skillStepper">
                <v-stepper-header>
                  <v-stepper-step
                      :complete="skillStepper > 1"
                      step="1"
                      editable
                  >
                    Skills:
                  </v-stepper-step>
                  <v-divider/>

                  <v-stepper-step
                      :complete="skillStepper > 2"
                      step="2"
                      editable
                  >
                    Advantages:
                  </v-stepper-step>

                  <v-divider/>

                  <v-stepper-step
                      :complete="skillStepper > 3"
                      step="3"
                      editable
                  >
                    Disadvantages:
                  </v-stepper-step>

                  <v-divider/>
                </v-stepper-header>

                <v-stepper-items>
                  <v-stepper-content :step="1">
                    <v-data-table
                        class="elevation-4"
                        disable-pagination
                        hide-default-footer
                        item-key="name"
                        :headers="[
                            {
                              text: 'Name',
                              value: 'name',
                            },
                            {
                              text: 'Type',
                              value: 'type',
                            },
                            {
                              text: 'Subtype',
                              value: 'subtype',
                            },
                            {
                              text: 'Rank',
                              value: 'rank',
                            },
                            {
                              text: 'Book',
                              value: 'reference',
                            },
                        ]"
                        :dark="this.$store.state.colorVariant"
                        :items="player.abilities"
                    >
                      <template v-slot:[`item.reference`]="{ item }">
                        <OpenBookComponent v-if="item.reference" :item="item.reference"/>
                      </template>
                    </v-data-table>
                  </v-stepper-content>
                </v-stepper-items>

                <v-stepper-items>
                  <v-stepper-content :step="2">
                    <v-data-table
                        class="elevation-4"
                        disable-pagination
                        hide-default-footer
                        item-key="name"
                        :headers="[
                           {text: 'Name', value: 'name'},
                           {text: 'Skill', value: 'skill'},
                           {text: 'Ring', value: 'ring'},
                           {text: 'Types', value: 'types'},
                        ]"
                        :dark="this.$store.state.colorVariant"
                        :items="player.advantages"
                    >
                      <template v-slot:[`item.types`]="{ item }">
                        {{ item.types ? item.types.join(', ') : '' }}
                      </template>
                    </v-data-table>
                  </v-stepper-content>
                </v-stepper-items>
                <v-stepper-items>
                  <v-stepper-content :step="3">
                    <v-data-table
                        class="elevation-4"
                        disable-pagination
                        hide-default-footer
                        item-key="name"
                        :headers="[
                           {text: 'Name', value: 'name'},
                           {text: 'Skill', value: 'skill'},
                           {text: 'Ring', value: 'ring'},
                           {text: 'Types', value: 'types'},
                        ]"
                        :dark="this.$store.state.colorVariant"
                        :items="player.disadvantages"
                    >
                      <template v-slot:[`item.types`]="{ item }">
                        {{ item.types ? item.types.join(', ') : '' }}
                      </template>
                    </v-data-table>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
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
              <b>Equipment:</b>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="player !== undefined">
              <v-stepper v-model="eqStepper">
                <v-stepper-header>
                  <v-stepper-step
                      :complete="eqStepper > 1"
                      step="1"
                      editable
                  >
                    Weapons:
                  </v-stepper-step>
                  <v-divider/>

                  <v-stepper-step
                      :complete="eqStepper > 2"
                      step="2"
                      editable
                  >
                    Armors:
                  </v-stepper-step>

                  <v-divider/>
                </v-stepper-header>

                <v-stepper-items>
                  <v-stepper-content :step="1">
                    <v-data-table
                        class="elevation-4"
                        disable-pagination
                        hide-default-footer
                        item-key="name"
                        :headers="[
                           {text: 'Name', value: 'name'},
                           {text: 'Range', value: 'range'},
                           {text: 'Damage', value: 'damage'},
                           {text: 'Deadliness', value: 'deadliness'},
                           {text: 'Book', value: 'reference'},
                        ]"
                        :dark="this.$store.state.colorVariant"
                        :items="player.weapons"
                    >
                      <template v-slot:[`item.range`]="{ item }">
                        {{ item.range.min }} - {{ item.range.max }}
                      </template>
                      <template v-slot:[`item.reference`]="{ item }">
                        <OpenBookComponent v-if="item.reference" :item="item.reference"/>
                      </template>
                    </v-data-table>
                  </v-stepper-content>
                </v-stepper-items>

                <v-stepper-items>
                  <v-stepper-content :step="2">
                    <v-data-table
                        class="elevation-4"
                        disable-pagination
                        hide-default-footer
                        item-key="name"
                        :headers="[
                            {
                              text: 'Name',
                              value: 'name',
                            },
                            {
                              text: 'Physical Resistance',
                              value: 'physRes',
                            },
                            {
                              text: 'Supernatural Resistance',
                              value: 'superRes',
                            },
                            {
                              text: 'Rarity',
                              value: 'rarity',
                            },
                            {
                              text: 'Book',
                              value: 'reference',
                            },
                          ]"
                        :dark="this.$store.state.colorVariant"
                        :items="player.armors"
                    >
                      <template v-slot:[`item.reference`]="{ item }">
                        <OpenBookComponent v-if="item.reference" :item="item.reference"/>
                      </template>
                    </v-data-table>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </v-card-text>
            <v-card-text v-else>
              <v-skeleton-loader type="table"></v-skeleton-loader>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="6">
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
                      readonly
                     :value="player.statistics.endurance"
                      placeholder="0"
                  />
                  <v-text-field
                      label="Composure:"
                      readonly
                     :value="player.statistics.composure"
                      placeholder="0"
                  />
                  <v-text-field
                      label="Vigilance:"
                      readonly
                     :value="player.statistics.vigilance"
                      placeholder="0"
                  />
                  <v-text-field
                      label="Focus:"
                      readonly
                      :value="player.statistics.focus"
                      placeholder="0"
                  />
                </v-col>
                <v-col>
                  <v-slider
                      label="Glory:"
                     :value="player.social.glory"
                      :thumb-size="24"
                      thumb-color="blue"
                      readonly         color="blue"
                      min="0"
                      max="100"
                      thumb-label="always"
                  ></v-slider>
                  <v-slider
                      label="Honor:"
                     :value="player.social.honor"
                      :thumb-size="24"
                      readonly       thumb-color="blue"
                      color="blue"
                      min="0"
                      max="100"
                      thumb-label="always"
                  ></v-slider>
                  <v-slider
                      label="Status:"
                     :value="player.social.status"
                      readonly     :thumb-size="24"
                      thumb-color="blue"
                      color="blue"
                      min="0"
                      max="100"
                      thumb-label="always"
                  ></v-slider>

                  <v-slider
                      label="Endurance:"
                      v-model="player.currentStats.endurance"
                      :thumb-size="24"
                      thumb-color="blue"
                      color="blue"
                      min="0"
                      :max="player.statistics.endurance"
                      thumb-label="always"
                  ></v-slider>
                  <v-slider
                      label="Composure:"
                      thumb-color="blue"
                      color="blue"
                      v-model="player.currentStats.composure"
                      :thumb-size="24"
                      min="0"
                      :max="player.statistics.composure"
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
          <MakeRollComponent :player="$store.state.gmData.npcs[this.id]" :npc="true" v-on:statschange="updateStats" />
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
                  readonly
                 :value="player.description"
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
import {Bond, CurrentStatistics, Npc, Player} from '@/domain/types/player.type';
import {getHook, getKami, getRingDescription, getStanceTooltip} from '@/domain/common';
import demeanorTemplates from '@/assets/data/json/demeanor.json';
import MakeRollComponent from '@/components/roll-page/MakeRollComponent.vue';
import AddNpc from '@/components/gm-panel/AddNpc.vue';

export default Vue.extend({
  name: 'NpcDetailsPage',
  components: {
    OpenBookComponent,
    MakeRollComponent,
  },
  props: {
    id: String,
  },
  beforeMount() {
    this.player = this.$store.state.gmData.npcs[this.id];
  },
  watch: {
    comp (newCount) {
      if (newCount != 0) {
        return;
      }

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
              title: this.player.name,
              text: 'Bends under pressure! (Unmasking)',
            },
          ],
          ...getKami(this.$store?.state?.kami, true),
        }),
      });
    },
  },
  data: () => {
    return {
      eqStepper: 1,
      skillStepper: 1,
      player: {} as Npc,
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
  computed: {
    comp () {
      return this.player?.currentStats?.composure;
    },
    endu () {
      return this.player?.currentStats?.endurance;
    },
    playerAvatar() {
      if (this.player === undefined || this.player.portraitImage === undefined || this.player.portraitImage.length <= 0) {
        return require('../../assets/img/npc/placeholder.jpg');
      }

      return 'data:image/png;charset=utf-8;base64,' + this.player.portraitImage;
    },
    demeanors: function () {
      return demeanorTemplates.map(item => item.name);
    },
  },
  methods: {
    refresh: function() {
      this.player = {...this.$store.state.gmData.npcs[this.id]};
    },
    updateStats: function (val: CurrentStatistics) {
      (this.$store.state.gmData.npcs[this.id] as Npc).currentStats = val;
      this.player = this.$store.state.gmData.npcs[this.id];
    },
    selectDemeanor: function (newValue: string) {
      for (const demeanorTemplate of demeanorTemplates) {
        if (demeanorTemplate.name === newValue) {
          this.player.demeanor = demeanorTemplate;
          break;
        }
      }
    },
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