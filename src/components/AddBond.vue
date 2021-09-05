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
                  label="Bond:"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  v-model="nameDistinction"
                  label="Name:"
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
import {Ability, Bond, PersonalTrait} from '@/domain/types/player.type';
import {BondsService, JsonBond} from '@/domain/services/bonds.service';

export default Vue.extend({
  name: 'AddBond',
  data: () => {
    return {
      dialog: false,
      selectedDistinction: '',
      nameDistinction: '',
      traits: BondsService.getBonds().map((item) => item.name),
    };
  },
  methods: {
    saveDistinction: function () {
      if (this.selectedDistinction.length <= 0) {
        return;
      }

      let jsonBond: JsonBond = BondsService.getBond(this.selectedDistinction);

      const bond: Bond = {
        book: jsonBond.reference.book,
        page: jsonBond.reference.page,
        name: jsonBond.name,
        ability: jsonBond.ability,
        rank: 1,
      };

      if (this.nameDistinction !== null && this.nameDistinction.length > 0) {
        bond.customValue = this.nameDistinction;
      }

      this.$store.state.player.bonds.push(bond);
      this.$store.state.player.abilities.push({
        name: jsonBond.ability,
        book: jsonBond.reference.book,
        page: jsonBond.reference.page,
        source: jsonBond.name,
        description: '',
      } as Ability);
      this.dialog = false;
    },
  },
});
</script>

<style scoped>

</style>