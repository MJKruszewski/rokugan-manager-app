<template>
  <v-row>
    <v-col sm="12" md="7">
      <v-row>
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
          >
            <v-card-title style="justify-content: space-between;">
              <b>Techniques:</b>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="$store.state.player !== undefined">
              <v-data-table
                  class="elevation-4"
                  disable-pagination
                  hide-default-footer
                  single-select
                  :headers="techniquesHeaders"
                  :dark="this.$store.state.colorVariant"
                  :items="this.$store.state.player.techniques"
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
    </v-col>
    <v-col sm="12" md="5">
      <v-row>
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
          >
            <v-card-title style="justify-content: space-between;">
              <b>Abilities:</b>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="$store.state.player !== undefined">
              <v-data-table
                  class="elevation-4"
                  disable-pagination
                  hide-default-footer
                  single-select
                  :headers="abilitiesHeaders"
                  :dark="this.$store.state.colorVariant"
                  :items="this.$store.state.player.abilities"
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
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import {Book} from '@/domain/types/player.type';
import OpenBookComponent from '@/components/OpenBookComponent.vue';

export default Vue.extend({
  name: 'TechniquesPage',
  components: {
    OpenBookComponent,
  },
  data: () => {
    return {
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
          text: 'Restriction',
          value: 'restriction',
        },

        {
          text: 'Book',
          value: 'book',
        },
      ],
      abilitiesHeaders: [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Source',
          value: 'source',
        },
        {
          text: 'Book',
          value: 'book',
        },
      ],
    };
  },
});
</script>


<style scoped>

</style>
