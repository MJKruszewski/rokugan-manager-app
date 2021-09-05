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
              <b>Attributes:</b>
            </v-card-title>
            <v-divider/>

            <v-card-text v-if="$store.state.player !== undefined">
              <v-row>
                <v-col>
                  <v-text-field
                      label="Endurance:"
                      disabled
                      v-model="$store.state.player.stats.endurance"
                      placeholder="0"
                  />
                  <v-text-field
                      label="Composure:"
                      disabled
                      v-model="$store.state.player.stats.composure"
                      placeholder="0"
                  />
                  <v-text-field
                      label="Vigilance:"
                      disabled
                      v-model="$store.state.player.stats.vigilance"
                      placeholder="0"
                  />
                  <v-text-field
                      label="Focus:"
                      disabled
                      v-model="$store.state.player.stats.focus"
                      placeholder="0"
                  />
                </v-col>
                <v-col>
                  <v-slider
                      label="Glory:"
                      v-model="$store.state.player.social.glory"
                      :thumb-size="24"
                      thumb-color="blue"
                      color="blue"
                      min="0"
                      max="100"
                      thumb-label="always"
                  ></v-slider>
                  <v-slider
                      label="Honor:"
                      v-model="$store.state.player.social.honor"
                      :thumb-size="24"
                      thumb-color="blue"
                      color="blue"
                      min="0"
                      max="100"
                      thumb-label="always"
                  ></v-slider>
                  <v-slider
                      label="Status:"
                      v-model="$store.state.player.social.status"
                      :thumb-size="24"
                      thumb-color="blue"
                      color="blue"
                      min="0"
                      max="100"
                      thumb-label="always"
                  ></v-slider>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-else>
              <v-skeleton-loader type="card"></v-skeleton-loader>
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
              <b>Bonds:</b>
                <div style="display: inline-flex;">
                  <AddBond/>
                  <v-btn
                      color="success"
                      style="margin-right: 7px"
                      :disabled="bondSelect === undefined || bondSelect.length === 0"
                      @click="upgradeBond"
                  >
                    Upgrade
                  </v-btn>
                  <v-btn
                      color="warning"
                      style="margin-right: 7px"
                      :disabled="bondSelect === undefined || bondSelect.length === 0"
                      @click="removeBond"
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
                  show-select
                  single-select
                  item-key="name"
                  v-model="bondSelect"
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
import AddBond from '@/components/AddBond.vue';
import {Advance} from '@/domain/types/player.type';

export default Vue.extend({
  name: 'BackgroundPage',
  components: {
    AddBond,
    OpenBookComponent,
  },
  data: () => {
    return {
      bondSelect: undefined,
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
    upgradeBond() {
      if (this.bondSelect === undefined || this.bondSelect.length <= 0) {
        return;
      }

      const selected = this.bondSelect[0];

      if (selected.rank >= 5) {
        return;
      }

      for (let i = 0; i < this.$store.state.player.bonds.length; i++) {
        const bond = this.$store.state.player.bonds[i];

        if (bond.name === selected.name && bond.rank === selected.rank) {
          bond.rank++;

          this.$store.state.player.advances.push({
            type: 'Bond Upgrade',
            name: bond.name,
            kind: 'none',
            cost: bond.rank * 2,
          } as Advance);

          break;
        }
      }

      this.bondSelect = [];
    },
    removeBond() {
      if (this.bondSelect === undefined || this.bondSelect.length <= 0) {
        return;
      }

      const selected = this.bondSelect[0];

      for (let i = 0; i < this.$store.state.player.bonds.length; i++) {
        const bond = this.$store.state.player.bonds[i];

        if (bond.name === selected.name && bond.rank === selected.rank) {
          this.$store.state.player.bonds.splice(i, 1);

          for (let j = 0; j < this.$store.state.player.abilities.length; j++) {
            const ability = this.$store.state.player.abilities[j];

            if (ability.source === bond.name) {
              this.$store.state.player.abilities.splice(j, 1);
              break;
            }
          }

          break;
        }
      }

      this.bondSelect = [];
    },
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