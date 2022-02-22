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
                <b>Other:</b>
              </v-card-title>
              <v-divider/>

              <v-card-text>
                <v-data-table
                    class="elevation-4"
                    disable-pagination
                    hide-default-footer
                    single-select
                    :items-per-page="40"
                    :headers="othersHeaders"
                    :dark="this.$store.state.colorVariant"
                    :items="this.getAllItems()"
                >
                  <template v-slot:[`item.qualities`]="{ item }">
                    <v-chip @click="openQualityBook(quality)" v-bind:key="quality + uuid.v4()" v-for="quality in (item.qualities || []).filter(val => val.length > 0)" :color="getQualityColor(quality)" :dark="$store.state.colorVariant">
                      {{ quality }}
                    </v-chip>
                  </template>
                  <template v-slot:[`item.price`]="{ item }">
                    {{ item.price ? item.price.value : '' }} {{  item.price ? item.price.unit : '' }}
                  </template>
                  <template v-slot:[`item.reference`]="{ item }">
                    <OpenBookComponent :item="item.reference"/>
                  </template>
                </v-data-table>
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
import {Book} from '@/domain/types/player.type';
import parsedQualities from '../assets/data/json/qualities.json';
import personalEffects from '../assets/data/json/personal_effects.json';

export default Vue.extend({
  name: 'ShopPage',
  components: {
    OpenBookComponent,
  },
  data: () => {
    return {
      uuid: require('uuid'),
      othersHeaders: [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Qualities',
          value: 'qualities',
        },
        {
          text: 'Rarity',
          value: 'rarity',
        },
        {
          text: 'Price',
          value: 'price',
        },
        {
          text: 'Book',
          value: 'book',
        },
      ],
    };
  },
  methods: {
    getAllItems: function () {
      console.log('personalEffects', personalEffects);
      return personalEffects;
    },
    getDamageColorScale: function (damage: number) {
      if (damage < 2) {
        return 'red lighten-5';
      } else if (damage < 4) {
        return 'red lighten-3';
      } else if (damage < 6) {
        return 'red lighten-1';
      } else if (damage < 8) {
        return 'red darken-2';
      } else {
        return 'red darken-4';
      }
    },
    getArmorColorScale: function (damage: number) {
      if (damage < 2) {
        return 'green lighten-4';
      } else if (damage < 3) {
        return 'green lighten-3';
      } else if (damage < 4) {
        return 'green lighten-2';
      } else if (damage < 5) {
        return 'green darken-1';
      } else if (damage < 6) {
        return 'green darken-2';
      } else {
        return 'green darken-4';
      }
    },
    openQualityBook: function (quality: string): void {
      let book: Book | null = null;
      let page: number | null = null;

      //@ts-ignore
      parsedQualities.forEach(item => {
        if (item.name !== quality) {
          return;
        }

        book = item.reference.book as Book;
        page = parseInt(item.reference.page.toString()) + 1;
      });

      if (book === null || page === null || this.$store.state.server.bookFiles[book] === null) {
        return;
      }

      console.log('open: ', this.$store.state.server.bookFiles[book] + '#page=' + page);
      window.open(this.$store.state.server.bookFiles[book] + '#page=' + page, 'modal', 'width=1000,height=800,nodeIntegration=no');
    },
    getQualityColor: function (quality: string) {
      switch (quality) {
        case 'Ceremonial':
          return 'teal lighten-1';
        case 'Concealable':
          return 'pink lighten-4';
        case 'Cumbersome':
          return 'amber darken-2';
        case 'Damaged':
          return 'deep-orange darken-1';
        case 'Destroyed':
          return 'red accent-4';
        case 'Durable':
          return 'indigo darken-3';
        case 'Forbidden':
          return 'brown darken-4';
        case 'Mundane':
          return 'brown lighten-1';
        case 'Prepare':
          return 'deep-orange lighten-3';
        case 'Razor-edged':
          return 'cyan lighten-3';
        case 'Resplendent':
          return 'green accent-3';
        case 'Sacred':
          return 'blue darken-2';
        case 'Snaring':
          return 'orange lighten-4';
        case 'Subtle':
          return 'teal lighten-3';
        case 'Unholy':
          return 'deep-purple darken-3';
        case 'Wargear':
          return 'red lighten-1';
      }

      return 'indigo';
    },
  },
});
</script>

<style scoped>

</style>