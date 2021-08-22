<template>
  <v-row>
    <v-col cols="12" md="7">
      <v-row>
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
          >
            <v-card-title style="justify-content: space-between;">
              <b>Character:</b>
              <v-btn color="info" v-on:click="changeAvatar()">Change avatar</v-btn>
              <input type="file" style="display: none" ref="avatar">
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="$store.state.player !== undefined">
              <v-text-field
                label="Clan:"
                v-model="$store.state.player.familyData.clan"
                disabled
              />
              <v-text-field
                label="Family:"
                v-model="$store.state.player.familyData.mon"
              />
              <v-text-field
                label="Personal Name:"
                v-model="$store.state.player.familyData.name"
              />
            </v-card-text>
            <v-card-text v-else>
              <v-skeleton-loader type="table"></v-skeleton-loader>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
          >
            <v-card-title style="justify-content: space-between;">
              <b>Story:</b>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="$store.state.player !== undefined">
              <v-textarea
                  label="Ninjo (Personal Desire):"
                  auto-grow
                  filled
                  v-model="$store.state.player.story.ninjo"
              ></v-textarea>
              <v-textarea
                  label="Giri (Sworn Duty):"
                  auto-grow
                  filled
                  v-model="$store.state.player.story.giri"
              ></v-textarea>
            </v-card-text>
            <v-card-text v-else>
              <v-skeleton-loader type="table"></v-skeleton-loader>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="5">
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
      <v-row>
        <v-col>
          <v-card
              :dark="this.$store.state.colorVariant"
              :text-variant="this.$store.state.textVariant"
          >
            <v-card-title style="justify-content: space-between;">
              <b>Notes:</b>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="$store.state.player !== undefined">
              <v-textarea
                  label="Notes:"
                  rows="15"
                  filled
                  v-model="$store.state.player.story.note"
              ></v-textarea>
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

export default Vue.extend({
  name: 'BackgroundPage',
  components: {
    OpenBookComponent,
  },
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
      ],
    };
  },
  methods: {
    getBonds() {
      if (this.$store.state.player === undefined) {
        return [];
      }

      return this.$store.state.player.bonds;
    },
    changeAvatar() {
      //todo
    },
  },
});
</script>

<style scoped>

</style>