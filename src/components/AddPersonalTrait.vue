<template>
  <v-dialog
      v-model="dialog"
      persistent
      :dark="this.$store.state.colorVariant"
      max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="primary"
          style="margin-right: 7px"
          v-bind="attrs"
          v-on="on"
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
            <v-col cols="12">
              <v-select
                  :items="traits"
                  v-model="selectedDistinction"
                  label="Distinction:"
              ></v-select>
            </v-col>
            <v-col cols="12" v-if="selectedDistinction.includes('[')">
              <v-text-field
                  v-model="nameDistinction"
                  :label="selectedDistinction.substring(selectedDistinction.indexOf('[') + 1, selectedDistinction.lastIndexOf(']'))"
              ></v-text-field>
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

</template>

<script lang="ts">
import Vue from 'vue';
import {PersonalTraitsService, Trait} from '@/domain/services/personal-traits.service';
import {PersonalTrait} from '@/domain/types/player.type';

export default Vue.extend({
  name: 'AddPersonalTrait',
  data: () => {
    return {
      dialog: false,
      selectedDistinction: '',
      nameDistinction: '',
    };
  },
  props: {
    traits: Array,
    type: String,
  },
  methods: {
    saveDistinction: function () {
      //     anxieties: [],
      //     adversities: [],
      //     distinctions: [],
      //     passions: [],

      if (this.selectedDistinction.length <= 0) {
        return;
      }

      let distinction: Trait;

      switch (this.type) {
        case 'anxieties':
          distinction = PersonalTraitsService.getAnxiety(this.selectedDistinction);
          break;
        case 'adversities':
          distinction = PersonalTraitsService.getAdversity(this.selectedDistinction);
          break;
        case 'passions':
          distinction = PersonalTraitsService.getPassion(this.selectedDistinction);
          break;
        case 'distinctions':
          distinction = PersonalTraitsService.getDistinction(this.selectedDistinction);
          break;
      }

      const trait: PersonalTrait = {
        book: distinction.reference.book,
        page: distinction.reference.page,
        ring: distinction.ring,
        name: distinction.name,
        types: distinction.types,
        type: this.type.charAt(0).toUpperCase() + this.type.slice(1).toLowerCase(),
      };

      if (this.nameDistinction !== null && this.nameDistinction.length > 0) {
        trait.customValue = this.nameDistinction;
      }

      this.$store.state.player[this.type].push(trait);
      this.dialog = false;
    },
  },
});
</script>

<style scoped>

</style>