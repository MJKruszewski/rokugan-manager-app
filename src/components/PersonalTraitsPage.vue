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
                <AddPersonalTrait
                    :type="'distinctions'"
                    :traits="distinctions"
                />
                <v-btn
                    color="warning"
                    style="margin-right: 7px"
                    :disabled="distinctionSelect.length === 0"
                    @click="removeDistinction"
                >
                  Remove
                </v-btn>
              </div>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="$store.state.player !== undefined">
              <v-data-table
                  class="elevation-4"
                  disable-pagination
                  hide-default-footer
                  single-select
                  item-key="name"
                  v-model="distinctionSelect"
                  show-select
                  :headers="headers"
                  :dark="this.$store.state.colorVariant"
                  :items="$store.state.player.distinctions"
              >
                <template v-slot:[`item.name`]="{ item }">
                  <template v-if="item.name.includes('[') && item.customValue !== undefined && item.customValue.length > 0">
                      {{ item.name.replace(item.name.substring(item.name.indexOf('['), item.name.lastIndexOf(']') + 1), item.customValue) }}
                  </template>
                  <template v-else>
                    {{ item.name }}
                  </template>
                </template>
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
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
          >
            <v-card-title style="justify-content: space-between;">
              <b>Passions:</b>
              <div style="display: inline-flex;">
                <AddPersonalTrait
                    :type="'passions'"
                    :traits="passions"
                />
                <v-btn
                    color="warning"
                    style="margin-right: 7px"
                    :disabled="passionsSelect.length === 0"
                    @click="removePassion"
                >
                  Remove
                </v-btn>
              </div>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="$store.state.player !== undefined">
              <v-data-table
                  class="elevation-4"
                  disable-pagination
                  v-model="passionsSelect"
                  item-key="name"
                  hide-default-footer
                  show-select
                  single-select
                  :headers="headers"
                  :dark="this.$store.state.colorVariant"
                  :items="this.$store.state.player.passions"
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
                <AddPersonalTrait
                    :type="'adversities'"
                    :traits="adversities"
                />
                <v-btn
                    color="warning"
                    style="margin-right: 7px"
                    :disabled="adversitiesSelect.length === 0"
                    @click="removeAdversity"
                >
                  Remove
                </v-btn>
              </div>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="$store.state.player !== undefined">
              <v-data-table
                  class="elevation-4"
                  disable-pagination
                  v-model="adversitiesSelect"
                  item-key="name"
                  show-select
                  hide-default-footer
                  single-select
                  :headers="headers"
                  :dark="this.$store.state.colorVariant"
                  :items="this.$store.state.player.adversities"
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
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
          >
            <v-card-title style="justify-content: space-between;">
              <b>Anxieties:</b>
              <div style="display: inline-flex;">
                <AddPersonalTrait
                    :type="'anxieties'"
                    :traits="anxieties"
                />
                <v-btn
                    color="warning"
                    style="margin-right: 7px"
                    :disabled="anxietiesSelect.length === 0"
                    @click="removeAnxiety"
                >
                  Remove
                </v-btn>
              </div>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="$store.state.player !== undefined">
              <v-data-table
                  class="elevation-4"
                  disable-pagination
                  hide-default-footer
                  v-model="anxietiesSelect"
                  item-key="name"
                  show-select
                  single-select
                  :headers="headers"
                  :dark="this.$store.state.colorVariant"
                  :items="this.$store.state.player.anxieties"
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
import OpenBookComponent from '@/components/OpenBookComponent.vue';
import {Trait, PersonalTraitsService} from '@/domain/services/personal-traits.service';
import {PersonalTrait} from '@/domain/types/player.type';
import AddPersonalTrait from '@/components/AddPersonalTrait.vue';

export default Vue.extend({
  name: 'PersonalTraitsPage',
  components: {
    AddPersonalTrait,
    OpenBookComponent,
  },
  data: () => {
    return {
      distinctionSelect: [],
      adversitiesSelect: [],
      passionsSelect: [],
      anxietiesSelect: [],

      dialog: false,
      selectedDistinction: '',
      nameDistinction: '',
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
          text: 'Types',
          value: 'types',
        },
        {
          text: 'Book',
          value: 'book',
        },
      ],
      distinctions: PersonalTraitsService.getDistinctions().map((item) => item.name),
      adversities: PersonalTraitsService.getAdversities().map((item) => item.name),
      anxieties: PersonalTraitsService.getAnxieties().map((item) => item.name),
      passions: PersonalTraitsService.getPassions().map((item) => item.name),
    };
  },
  methods: {
    removeAdversity: function () {
      if (this.adversitiesSelect.length <= 0) {
        return;
      }

      const trait = this.adversitiesSelect[0];

      for (let i = 0; i < this.$store.state.player.adversities.length; i++) {
        const tmp = this.$store.state.player.adversities[i];
        if (trait.name === tmp.name) {
          this.$store.state.player.adversities.splice(i, 1);
          break;
        }
      }

      this.adversitiesSelect = [];
    },
    removeAnxiety: function () {
      if (this.anxietiesSelect.length <= 0) {
        return;
      }

      const trait = this.anxietiesSelect[0];

      for (let i = 0; i < this.$store.state.player.anxieties.length; i++) {
        const tmp = this.$store.state.player.anxieties[i];
        if (trait.name === tmp.name) {
          this.$store.state.player.anxieties.splice(i, 1);
          break;
        }
      }

      this.anxietiesSelect = [];
    },
    removePassion: function () {
      if (this.passionsSelect.length <= 0) {
        return;
      }

      const trait = this.passionsSelect[0];

      for (let i = 0; i < this.$store.state.player.passions.length; i++) {
        const tmp = this.$store.state.player.passions[i];
        if (trait.name === tmp.name) {
          this.$store.state.player.passions.splice(i, 1);
          break;
        }
      }

      this.passionsSelect = [];
    },
    removeDistinction: function () {
      if (this.distinctionSelect.length <= 0) {
        return;
      }

      const trait = this.distinctionSelect[0];

      for (let i = 0; i < this.$store.state.player.distinctions.length; i++) {
        const tmp = this.$store.state.player.distinctions[i];

        if (trait.name === tmp.name) {
          this.$store.state.player.distinctions.splice(i, 1);
          break;
        }
      }

      this.distinctionSelect = [];
    },
  },

});
</script>

<style scoped>

</style>