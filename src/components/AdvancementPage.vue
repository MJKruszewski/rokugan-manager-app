<template>
  <v-row>
    <v-col sm="12" md="6">
      <v-row>
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
          >
            <v-card-title style="justify-content: space-between;">
              <b>Curriculum: rank {{ this.rank }}, exp {{ this.exp }}</b>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="$store.state.player !== undefined">
              <v-data-table
                  class="elevation-4"
                  disable-pagination
                  hide-default-footer
                  dense
                  single-select
                  @click:row="curriculumClick"
                  :headers="curriculumHeaders"
                  group-by="rank"
                  :dark="this.$store.state.colorVariant"
                  :items="getSchoolAdvances()"
              ></v-data-table>
            </v-card-text>
            <v-card-text v-else>
              <v-skeleton-loader type="table"></v-skeleton-loader>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col sm="12" md="6">
      <v-row>
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
          >
            <v-card-title style="justify-content: space-between;">
              <b>Advances:</b>
              <v-dialog
                  v-model="this.dialog"
                  persistent
                  :dark="this.$store.state.colorVariant"
                  max-width="1100px"
              >
                <template v-slot:activator="{  }">
                  <v-btn
                      color="primary"
                      style="margin-right: 7px"
                      @click="dialog = true"
                  >
                    Add
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Add Personal Trait</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="5">
                          <v-checkbox
                              v-model="isRemoveAllRestrictions"
                              label="Remove All Restrictions"
                              v-on:change="loadTechniques"
                          ></v-checkbox>
                        </v-col>
                        <v-col cols="7">
                          <v-checkbox
                              v-model="isSpecialTraining"
                              label="Special Training: Half the XP cost"
                          ></v-checkbox>
                        </v-col>
                        <v-col cols="6">
                          <v-select
                              :items="advanceOptions"
                              v-model="selectedDistinction"
                              label="Spend XP to learn a:"
                              v-on:change="selectSublist"
                          ></v-select>
                        </v-col>
                        <v-col cols="6">
                          <v-autocomplete
                              v-model="selectedAdvanceSublist"
                              :items="advanceSublistOptions"
                              v-on:change="loadTechniques"
                              label="Choose:"
                              :disabled="selectedDistinction === undefined || selectedDistinction === null || selectedDistinction.length <= 0"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                          <v-select
                              :items="advanceProgressOptions"
                              label="Advance progress in:"
                              hidden
                          ></v-select>
                        </v-col>
                        <v-col cols="12" v-if="selectedDistinction === 'Technique' && selectedAdvanceSublist.length > 0">
                              <v-data-table
                                  class="elevation-4"
                                  disable-pagination
                                  hide-default-footer
                                  single-select
                                  dense
                                  show-select
                                  :headers="techniquesHeaders"
                                  :dark="this.$store.state.colorVariant"
                                  :items="this.techniquesList"
                              >
                                <template v-slot:[`item.book`]="{ item }">
                                  <OpenBookComponent :item="item"/>
                                </template>
                              </v-data-table>
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>Requires GM Approval</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="saveDistinction"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="$store.state.player !== undefined">
              <v-data-table
                  class="elevation-4"
                  disable-pagination
                  hide-default-footer
                  single-select
                  dense
                  :headers="advancesHeaders"
                  :dark="this.$store.state.colorVariant"
                  :items="this.$store.state.player.advances"
              ></v-data-table>
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
              <b>Title:</b>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="$store.state.player !== undefined">
              <v-data-table
                  class="elevation-4"
                  disable-pagination
                  hide-default-footer
                  single-select
                  :headers="titleHeaders"
                  :dark="this.$store.state.colorVariant"
                  :items="getTitleAdvances()"
              ></v-data-table>
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
import schools from '../assets/data/json/schools.json';
import titles from '../assets/data/json/titles.json';
import {BondsService} from '@/domain/services/bonds.service';
import {Skill} from '@/domain/types/skill.type';
import {Ring} from '@/domain/types/ring.type';
import {AdvanceService} from '@/domain/services/advance.service';
import {Book} from '@/domain/types/player.type';
import OpenBookComponent from '@/components/OpenBookComponent.vue';
import {PlayerService} from '@/domain/services/player.service';

export default Vue.extend({
  name: 'AdvancementPage',
  components: {OpenBookComponent},
  mounted() {
    const rank = PlayerService.calculateRank(this.$store.state.player);

    this.rank = rank.rank;
    this.exp = rank.totalExp;
  },
  data: (): { [key: string]: any; } => {
    return {
      dialog: false,
      schoolSelect: null,
      expPrice: 0,
      rank: 0,
      exp: 0,
      selectedDistinction: '',
      selectedAdvanceSublist: '',
      nameDistinction: '',
      traits: BondsService.getBonds().map((item) => item.name),
      advanceSublistOptions: [],
      techniquesList: [],
      advanceOptions: [
          'Skill',
          'Technique',
          'Ring',
      ],
      advanceProgressOptions: [
          'Curriculum',
          'Title',
          'Free (none)',
      ],
      isSpecialTraining: false,
      isRemoveAllRestrictions: false,
      techniquesHeaders: [
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
          text: 'XP',
          value: 'xp',
        },
        {
          text: 'Book',
          value: 'book',
        },
        {
          text: 'Restriction',
          value: 'restriction',
        },
      ],

      schoolSteps: [],
      titleSteps: [],
      curriculumHeaders: [
        {
          text: 'Rank',
          value: 'rank',
        },
        {
          text: 'Advance',
          value: 'advance',
        },
        {
          text: 'Type',
          value: 'type',
        },
      ],
      titleHeaders: [
        {
          text: 'Advance',
          value: 'name',
        },
        {
          text: 'Type',
          value: 'type',
        },
      ],
      advancesHeaders: [
        {
          text: 'Type',
          value: 'type',
        },
        {
          text: 'Advance',
          value: 'name',
        },
        {
          text: 'Track',
          value: 'kind',
        },
        {
          text: 'Cost',
          value: 'cost',
        },
      ],
    };
  },
  methods: {
    getSchoolAdvances() {
      if (this.schoolSteps) {
        // return this.schoolSteps;
      }

      for (let schoolsKey in schools) {
        const school = schools[schoolsKey];

        if (school.name === this.$store.state.player.familyData.school) {
          //@ts-ignore
          this.schoolSteps = school.curriculum;
          break;
        }
      }

      return this.schoolSteps;
    },
    saveDistinction: function () {
      if (this.selectedDistinction.length <= 0) {
        return;
      }

      this.dialog = false;
    },
    selectSublist() {
      this.advanceSublistOptions = AdvanceService.getPossibleAdvances(this.selectedDistinction, this.$store.state.player);
    },
    loadTechniques() {
      if (this.selectedDistinction !== 'Technique') {
        return;
      }

      this.techniquesList = AdvanceService.getPossibleTechniques(this.selectedAdvanceSublist, this.isRemoveAllRestrictions, this.$store.state.player);
    },
    curriculumClick(item: any) {
      this.dialog = true;
      this.schoolSelect = item;
    },
    getTitleAdvances() {
      if (this.titleSteps) {
        // return this.titleSteps;
      }

      for (let titlesKey in titles) {
        const title = titles[titlesKey];

        if (title.name === this.$store.state.player.currentTitle) {
          //@ts-ignore
          this.titleSteps = title.advancements;
          break;
        }
      }

      return this.titleSteps;
    },
  },
});
</script>

<style scoped>

</style>