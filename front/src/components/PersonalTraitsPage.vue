<template>
  <v-row>
    <v-col cols="6">
      <v-row>
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
          >
            <v-card-title style="justify-content: space-between;">
              <b>Distinctions:</b>
              <div style="display: inline-flex;">
                <v-btn style="margin-right: 7px">Add</v-btn>
                <v-btn>Remove</v-btn>
              </div>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="$store.state.player !== undefined">
              <v-data-table
                  class="elevation-4"
                  disable-pagination
                  hide-default-footer
                  single-select
                  :headers="headers"
                  :dark="this.$store.state.colorVariant"
                  :items="this.$store.state.player.distinctions"
              ></v-data-table>
            </v-card-text>
            <v-card-text v-else>
              <v-skeleton-loader type="table"></v-skeleton-loader>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
          >
            <v-card-title style="justify-content: space-between;">
              <b>Passions:</b>
              <div style="display: inline-flex;">
                <v-btn style="margin-right: 7px">Add</v-btn>
                <v-btn>Remove</v-btn>
              </div>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="$store.state.player !== undefined">
              <v-data-table
                  class="elevation-4"
                  disable-pagination
                  hide-default-footer
                  single-select
                  :headers="headers"
                  :dark="this.$store.state.colorVariant"
                  :items="this.$store.state.player.passions"
              ></v-data-table>
            </v-card-text>
            <v-card-text v-else>
              <v-skeleton-loader type="table"></v-skeleton-loader>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="6">
      <v-row>
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
          >
            <v-card-title style="justify-content: space-between;">
              <b>Adversities:</b>
              <div style="display: inline-flex;">
                <v-btn style="margin-right: 7px">Add</v-btn>
                <v-btn>Remove</v-btn>
              </div>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="$store.state.player !== undefined">
              <v-data-table
                  class="elevation-4"
                  disable-pagination
                  hide-default-footer
                  single-select
                  :headers="headers"
                  :dark="this.$store.state.colorVariant"
                  :items="this.$store.state.player.adversities"
              ></v-data-table>
            </v-card-text>
            <v-card-text v-else>
              <v-skeleton-loader type="table"></v-skeleton-loader>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
          >
            <v-card-title style="justify-content: space-between;">
              <b>Anxieties:</b>
              <div style="display: inline-flex;">
                <v-btn style="margin-right: 7px">Add</v-btn>
                <v-btn>Remove</v-btn>
              </div>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="$store.state.player !== undefined">
              <v-data-table
                  class="elevation-4"
                  disable-pagination
                  hide-default-footer
                  single-select
                  :headers="headers"
                  :dark="this.$store.state.colorVariant"
                  :items="this.$store.state.player.anxieties"
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

export default Vue.extend({
  name: 'PersonalTraitsPage',
  data: () => {
    return { 
      headers: [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Ring',
          value: 'ring',
        },
        {
          text: 'Type',
          value: 'type',
        },
        {
          text: 'Book',
          value: 'book',
        },
        {
          text: 'Page',
          value: 'page',
        },
        {
          text: 'Types',
          value: 'types',
        },
      ],
    };
  },
});
</script>

<style scoped>

</style>