<template>
  <v-row>
    <v-col cols="12">
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

            <v-card-text v-if="$store.state.player !== undefined">
              <v-data-table
                  class="elevation-4"
                  disable-pagination
                  hide-default-footer
                  single-select
                  :headers="bondsHeaders"
                  :dark="this.$store.state.colorVariant"
                  :items="this.getBonds()"
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
import {PlayerService} from '@/domain/services/player.service';

export default Vue.extend({
  name: 'BondsPage', 
  data: () => {
    return {
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
        {
          text: 'Page',
          value: 'page',
        },
      ],
    };
  },
  methods: {
    getBonds() {
      console.log('Bonds called', this.$store.state.player);

      if (this.$store.state.player === undefined) {
        return [];
      }

      return this.$store.state.player.bonds;
    },
  },
});
</script>

<style scoped>

</style>