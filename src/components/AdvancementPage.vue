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
              <b>Curriculum:</b>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="$store.state.player !== undefined">
              <v-data-table
                  class="elevation-4"
                  disable-pagination
                  hide-default-footer
                  single-select
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
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="$store.state.player !== undefined">
              <v-data-table
                  class="elevation-4"
                  disable-pagination
                  hide-default-footer
                  single-select
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

export default Vue.extend({
  name: 'AdvancementPage',
  data: () => {
    return {
      schoolSteps: null,
      titleSteps: null,
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
          this.schoolSteps = school.curriculum;
          break;
        }
      }

      if (this.schoolSteps === null) {
        this.schoolSteps = [];
      }

      return this.schoolSteps;
    },
    getTitleAdvances() {
      if (this.titleSteps) {
        // return this.titleSteps;
      }

      for (let titlesKey in titles) {
        const title = titles[titlesKey];

        if (title.name === this.$store.state.player.currentTitle) {
          this.titleSteps = title.advancements;
          break;
        }
      }

      if (this.titleSteps === null) {
        this.titleSteps = [];
      }

      return this.titleSteps;
    },
  },
});
</script>

<style scoped>

</style>