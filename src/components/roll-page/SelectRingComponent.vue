<template>
  <v-card
      :dark="this.$store.state.colorVariant"
      :text-variant="this.$store.state.textVariant"
      class="container-color"
  >
    <v-card-title>
      <b>Select ring:</b>
    </v-card-title>
    <v-divider/>

    <v-card-text v-if="$store.state.player !== undefined">
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
          :items="this.$store.state.player.rings"
          @click:row="ringSelect"
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
</template>
<script lang="ts">
import {Ring} from '@/domain/types/ring.type';
import {getRingDescription, getStanceTooltip} from '@/domain/common';
import Vue from 'vue';

export default Vue.extend({
  name: 'SelectRingComponent',
  data() {
    return {
      uuid: require('uuid'),
    };
  },
  methods: {
    ringSelect: function (val: Ring) {
      if (this.$store.state.mainRoll.isDuringRoll) {
        return;
      }

      this.$store.state.mainRoll.selectedRing = val.name;
      this.$store.state.mainRoll.selectedRingValue = val.value;

      this.$store.state.mainRoll.bDices = [];
      this.$store.state.mainRoll.selectedIds = [];

      for (let i = 0; i < this.$store.state.mainRoll.selectedRingValue; i++) {
        this.$store.state.mainRoll.bDices.push({
          id: this.uuid.v4(),
          img: 'black.png',
        });
      }

      localStorage.setItem('mainRoll', JSON.stringify(this.$store.state.mainRoll));
    },
    getLocalStanceTooltip: function (stance: string) {
      return getStanceTooltip(stance);
    },
    getDescriptionRing: function (ring: string) {
      return getRingDescription(ring);
    },
  },
});
</script>
<style>

.container-color {
  /*background-color: #343a40e6 !important;*/
}

</style>