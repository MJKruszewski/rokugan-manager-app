<template>
  <v-dialog
      v-model="this.dialog"
      persistent
      :dark="this.$store.state.colorVariant"
      max-width="1100px"
  >
    <template v-slot:activator="{  }">
      <v-btn
          color="success"
          style="margin-right: 7px"
          @click="dialog = true"
      >
        Add
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Add Weapon</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-data-table
                  class="elevation-4"
                  disable-pagination
                  hide-default-footer
                  single-select
                  dense
                  show-select
                  item-key="name"
                  v-model="selectedTechnique"
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
                  :items="this.armorList"
              >
                <template v-slot:[`item.reference`]="{ item }">
                  <OpenBookComponent v-if="item.reference" :item="item.reference"/>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-container>
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
            @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import OpenBookComponent from '@/components/OpenBookComponent.vue';
import Vue from 'vue';
import armorsTemplates from '../../assets/data/json/armor.json';
import {Book, NpcArmor, NpcWeapon} from '@/domain/types/player.type';

export default Vue.extend({
  name: 'AddNpcArmor',
  components: {
    OpenBookComponent,
  },
  data: (): { [key: string]: any; } => {
    return {
      dialog: false,

      weaponTypeSelected: '',
      selectedSubcategory: '',
      selectedTechnique: undefined,

      weaponTypesOptions: new Array<string>(),
      subcategoryOptions: [],

      armorList: new Array<NpcArmor>(),
    };
  },
  beforeMount() {
    for (const armorTemplate of armorsTemplates) {
      let phys = 0;
      let superNatural = 0;

      for (const resistanceValue of armorTemplate.resistance_values) {
        if (resistanceValue.category === 'Physical'){
          phys = resistanceValue.value;
        }

        if (resistanceValue.category === 'Supernatural'){
          superNatural = resistanceValue.value;
        }
      }

      this.armorList.push({
        name: armorTemplate.name,
        superRes: superNatural,
        physRes: phys,
        rarity: armorTemplate.rarity,
        reference: {
          book: armorTemplate.reference.book as Book,
          page: armorTemplate.reference.page.toString(),
        },
      });
    }
  },
  methods: {
    save: function () {
      if (this.selectedTechnique === undefined || this.selectedTechnique.length <= 0) {
        return;
      }

      this.$emit('save', {...this.selectedTechnique[0]});

      this.dialog = false;
    },
  },
});
</script>

<style scoped>

</style>