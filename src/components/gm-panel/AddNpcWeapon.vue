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
            <v-col cols="6">
              <v-autocomplete
                  v-model="weaponTypeSelected"
                  :items="weaponTypesOptions"
                  v-on:change="loadWeapons"
                  label="Category:"
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" v-if="weaponTypeSelected.length > 0">
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
                           {text: 'Name', value: 'name'},
                           {text: 'Range', value: 'range'},
                           {text: 'Damage', value: 'damage'},
                           {text: 'Deadliness', value: 'deadliness'},
                           {text: 'Book', value: 'reference'},
                        ]"
                  :dark="this.$store.state.colorVariant"
                  :items="this.weaponList"
              >
                <template v-slot:[`item.range`]="{ item }">
                  {{ item.range.min }} - {{ item.range.max }}
                </template>
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
import weaponsTemplates from '../../assets/data/json/weapons.json';
import {Book, NpcWeapon} from '@/domain/types/player.type';

export default Vue.extend({
  name: 'AddNpcWeapon',
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

      weaponList: new Array<NpcWeapon>(),

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
          text: 'Book',
          value: 'book',
        },
      ],
    };
  },
  beforeMount() {
    for (const group of weaponsTemplates) {
      this.weaponTypesOptions.push(group.name as string);
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
    loadWeapons() {
      for (const group of weaponsTemplates) {
        if (group.name !== this.weaponTypeSelected) {
          continue;
        }

        this.weaponList = [];

        for (const weapon of group.entries) {
          let damage = '';
          let deadlines = '';

          for (const grip of weapon.grips) {
            for (const effect of grip.effects) {
              if (effect.attribute === 'damage' && effect?.value_increase) {
                damage = '/' + (weapon.damage + effect?.value_increase).toString();
              }

              if (effect.attribute === 'deadliness' && effect?.value_increase) {
                deadlines = '/' + (weapon.deadliness + effect.value_increase).toString();
              }
            }
          }

          this.weaponList.push({
            name: weapon.name,
            damage: weapon.damage.toString() + damage,
            deadliness: weapon.deadliness.toString() + deadlines,
            range: {
              min: weapon.range.min,
              max: weapon.range.max,
            },
            reference: {
              book: weapon.reference.book as Book,
              page: weapon.reference.page.toString(),
            },
          } as NpcWeapon);
        }
        break;
      }
    },
  },
});
</script>

<style scoped>

</style>