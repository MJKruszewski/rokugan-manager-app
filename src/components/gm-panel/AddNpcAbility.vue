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
        <span class="text-h5">Add Personal Trait</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-autocomplete
                  v-model="selectedAdvanceSublist"
                  :items="advanceSublistOptions"
                  v-on:change="loadSubcategories"
                  label="Category:"
              ></v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                  v-model="selectedSubcategory"
                  :items="subcategoryOptions"
                  v-on:change="loadTechniques"
                  label="Subcategory:"
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" v-if="selectedAdvanceSublist.length > 0">
              <v-data-table
                  class="elevation-4"
                  disable-pagination
                  hide-default-footer
                  single-select
                  dense
                  show-select
                  item-key="name"
                  v-model="selectedTechnique"
                  :headers="techniquesHeaders"
                  :dark="this.$store.state.colorVariant"
                  :items="this.techniquesList"
              >
                <template v-slot:[`item.book`]="{ item }">
                  <OpenBookComponent :item="item"/>
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
            @click="saveDistinction"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import schools from '@/assets/data/json/schools.json';
import {AdvanceService} from '@/domain/services/advance.service';
import titles from '@/assets/data/json/titles.json';
import techniques from '../../assets/data/json/techniques.json';
import OpenBookComponent from '@/components/OpenBookComponent.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'AddNpcAbility',
  components: {
    OpenBookComponent,
  },
  data: (): { [key: string]: any; } => {
    return {
      dialog: false,

      selectedAdvanceSublist: '',
      selectedSubcategory: '',
      selectedTechnique: undefined,

      advanceSublistOptions: new Array<string>(),
      subcategoryOptions: [],

      techniquesList: [],

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
    for (const group of techniques) {
      this.advanceSublistOptions.push(group.name as string);
    }
  },
  methods: {
    saveDistinction: function () {
      if (this.selectedTechnique === undefined || this.selectedTechnique.length <= 0) {
        return;
      }

      this.$emit('save', {...this.selectedTechnique[0]});

      this.dialog = false;
    },
    loadSubcategories() {
      for (const group of techniques) {
        if (group.name !== this.selectedAdvanceSublist) {
          continue;
        }

        this.techniquesList = [];
        this.subcategoryOptions = [];
        for (const subcategory of group.subcategories) {
          this.subcategoryOptions.push(subcategory.name);
        }
        break;
      }
    },
    loadTechniques() {
      for (const group of techniques) {
        if (group.name !== this.selectedAdvanceSublist) {
          continue;
        }

        for (const subcategory of group.subcategories) {
          if (subcategory.name !== this.selectedSubcategory) {
            continue;
          }

          this.techniquesList = [];

          for (const technique of subcategory.techniques) {
            this.techniquesList.push({...technique, type: group.name, subtype: subcategory.name});
          }

          break;
        }
        break;
      }
    },
  },
});
</script>

<style scoped>

</style>