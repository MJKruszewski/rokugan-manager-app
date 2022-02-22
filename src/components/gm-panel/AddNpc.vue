<template>
  <v-dialog
      v-model="dialog"
      persistent
      dark
      max-width="1000px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
      >
        Add
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Add NPC</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                  label="Base template"
                  dark
                  :items="this.templates"
                  v-model="selectedTemplate"
                  v-on:change="setTemplate"
              />
            </v-col>
            <v-col cols="12">
              <v-file-input         id="npcImage"
                                    ref="npcImage"
                                    type="file"
                                    v-model="files"
                                    placeholder="Portrait"
                                    v-on:change="onFileChanged"
              ></v-file-input>
            </v-col>

          </v-row>
          <v-divider/>


          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step
                  :complete="e1 > 1"
                  step="1"
              >
                Base data
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                  :complete="e1 > 2"
                  step="2"
              >
                Abilities
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3">
                Equipment
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                  <v-row justify="space-between">
                    <v-col sm="12" md="4">
                      <v-text-field
                          label="Name"
                          v-model="this.name"
                          :rules="[v => !!v || 'Field is required',]"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col sm="12" md="2">
                      <v-text-field
                          label="Honor"
                          type="number"
                          :rules="[v => !(v < 0) || 'Field is required',]"
                          v-model="this.honor"
                          required
                      >
                        <v-img slot="prepend"
                               width="32px"
                               :src="require('../../assets/img/tao.png')"/>
                      </v-text-field>
                    </v-col>
                    <v-col sm="12" md="2">
                      <v-text-field
                          label="Glory"
                          type="number"
                          :rules="[v => !(v < 0) || 'Field is required',]"
                          v-model="this.glory"
                          required
                      >
                        <v-img slot="prepend"
                               width="32px"
                               :src="require('../../assets/img/tao.png')"/>
                      </v-text-field>
                    </v-col>
                    <v-col sm="12" md="2">
                      <v-text-field
                          label="Status"
                          type="number"
                          :rules="[v => !(v < 0) || 'Field is required',]"
                          v-model="this.status"
                          required
                      >
                        <v-img slot="prepend"
                               width="32px"
                               :src="require('../../assets/img/tao.png')"/>
                      </v-text-field>
                    </v-col>
                    <v-col sm="12" md="4">
                      <v-autocomplete
                          label="Demeanor"
                          dark
                          :rules="[v => !!v || 'Field is required',]"
                          :items="this.demeanors"
                          v-model="demeanor"
                          required
                      />
                    </v-col>
                    <v-col sm="12" md="8">
                      <v-textarea
                          label="Description"
                          dark
                          v-model="description"
                          required
                      />
                    </v-col>
                  </v-row>

                  <v-container>
                    Rings:
                    <v-row justify="space-between">
                      <v-col sm="12" md="2">
                        <v-text-field
                            label="Air"
                            type="number"
                            :rules="[v => !(v < 1) || 'Field is required',]"
                            v-model="this.air"
                            min="1"
                            required
                        >
                          <v-img slot="prepend"
                                 width="32px"
                                 :src="require('../../assets/img/ring/air.png')"/>
                        </v-text-field>
                      </v-col>
                      <v-col sm="12" md="2">
                        <v-text-field
                            label="Fire"
                            :rules="[v => !(v < 1) || 'Field is required',]"
                            type="number"
                            v-model="this.fire"
                            min="1"
                            required
                        >
                          <v-img slot="prepend"
                                 width="32px"
                                 :src="require('../../assets/img/ring/fire.png')"/>
                        </v-text-field>
                      </v-col>
                      <v-col sm="12" md="2">
                        <v-text-field
                            label="Water"
                            type="number"
                            :rules="[v => !(v < 1) || 'Field is required',]"
                            v-model="this.water"
                            min="1"
                            required
                        >
                          <v-img slot="prepend"
                                 width="32px"
                                 :src="require('../../assets/img/ring/water.png')"/>
                        </v-text-field>
                      </v-col>
                      <v-col sm="12" md="2">
                        <v-text-field
                            label="Earth"
                            type="number"
                            :rules="[v => !(v < 1) || 'Field is required',]"
                            v-model="this.earth"
                            min="1"
                            required
                        >
                          <v-img slot="prepend"
                                 width="32px"
                                 :src="require('../../assets/img/ring/earth.png')"/>
                        </v-text-field>
                      </v-col>
                      <v-col sm="12" md="2">
                        <v-text-field
                            label="Void"
                            type="number"
                            :rules="[v => !(v < 1) || 'Field is required',]"
                            v-model="this.void"
                            min="1"
                            required
                        >
                          <v-img slot="prepend"
                                 width="32px"
                                 :src="require('../../assets/img/ring/void.png')"/>
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>

                  <v-container>
                    Stats:
                    <v-row justify="space-between">
                      <v-col sm="12" md="2">
                        <v-text-field
                            label="Endurance"
                            type="number"
                            :rules="[v => !(v < 0) || 'Field is required',]"
                            v-model="this.endurance"
                            min="1"
                            required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col sm="12" md="2">
                        <v-text-field
                            label="Composure"
                            type="number"
                            :rules="[v => !(v < 0) || 'Field is required',]"
                            v-model="this.composure"
                            min="1"
                            required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col sm="12" md="2">
                        <v-text-field
                            label="Focus"
                            type="number"
                            :rules="[v => !(v < 0) || 'Field is required',]"
                            v-model="this.focus"
                            min="1"
                            required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col sm="12" md="2">
                        <v-text-field
                            label="Vigilance"
                            type="number"
                            :rules="[v => !(v < 0) || 'Field is required',]"
                            v-model="this.vigilance"
                            min="1"
                            required
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row justify="space-between">

                      <v-col sm="12" md="2" class="deep-purple lighten-1">
                        <v-text-field
                            label="Artisan"
                            type="number"
                            :rules="[v => !(v < 0) || 'Field is required',]"
                            v-model="this.artisan"
                            min="0"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col sm="12" md="2" class="green">
                        <v-text-field
                            label="Martial"
                            type="number"
                            :rules="[v => !(v < 0) || 'Field is required',]"
                            v-model="this.martial"
                            min="0"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col sm="12" md="2" class="amber darken-1">
                        <v-text-field
                            label="Scholar"
                            type="number"
                            :rules="[v => !(v < 0) || 'Field is required',]"
                            v-model="this.scholar"
                            min="0"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col sm="12" md="2" class="indigo darken-1">
                        <v-text-field
                            label="Social"
                            type="number"
                            :rules="[v => !(v < 0) || 'Field is required',]"
                            v-model="this.social"
                            min="0"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col sm="12" md="2" class="grey darken-3">
                        <v-text-field
                            label="Trade"
                            type="number"
                            :rules="[v => !(v < 0) || 'Field is required',]"
                            v-model="this.trade"
                            min="0"
                            required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>

                  <v-container>
                    Wealth:
                    <v-row justify="space-between">
                      <v-col sm="12" md="2">
                        <v-text-field
                            label="Koku"
                            type="number"
                            :rules="[v => !(v < 0) || 'Field is required',]"
                            v-model="this.koku"
                            min="0"
                            required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col sm="12" md="2">
                        <v-text-field
                            label="Bu"
                            :rules="[v => !(v < 0) || 'Field is required',]"
                            type="number"
                            v-model="this.bu"
                            min="0"
                            required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col sm="12" md="2">
                        <v-text-field
                            label="Zeni"
                            type="number"
                            :rules="[v => !(v < 0) || 'Field is required',]"
                            v-model="this.zeni"
                            min="0"
                            required
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                >
                  Close
                </v-btn>
                <v-btn
                    color="primary"
                    @click="secondStep"
                >
                  Continue
                </v-btn>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-container>
                  <v-card
                      :dark="this.$store.state.colorVariant"
                      :text-variant="this.$store.state.textVariant"
                  >
                    <v-card-title style="justify-content: space-between;">
                      <b>Advantages:</b>
                      <div style="display: inline-flex;">
                        <AddNpcAdvantage v-on:save="saveAdvantage"/>
                        &nbsp;
                        <v-btn
                            color="warning"
                            style="margin-right: 7px"
                            :disabled="advantagesSelected.length === 0"
                            @click="removeAdvantage"
                        >
                          Remove
                        </v-btn>
                      </div>
                    </v-card-title>
                    <v-divider/>

                    <v-card-text>
                      <v-data-table
                          class="elevation-4"
                          disable-pagination
                          hide-default-footer
                          single-select
                          v-model="advantagesSelected"
                          show-select
                          item-key="name"
                          :headers="[
                           {text: 'Name', value: 'name'},
                           {text: 'Skill', value: 'skill'},
                           {text: 'Ring', value: 'ring'},
                           {text: 'Types', value: 'types'},
                        ]"
                          :dark="this.$store.state.colorVariant"
                          :items="advantages"
                      >
                        <template v-slot:[`item.types`]="{ item }">
                          {{ item.types ? item.types.join(', ') : '' }}
                        </template>
                      </v-data-table>
                    </v-card-text>
                  </v-card>
                </v-container>

                <v-container>
                  <v-card
                      :dark="this.$store.state.colorVariant"
                      :text-variant="this.$store.state.textVariant"
                  >
                    <v-card-title style="justify-content: space-between;">
                      <b>Disadvantages:</b>
                      <div style="display: inline-flex;">
                        <AddNpcAdvantage v-on:save="saveDisadvantage"/>
                        &nbsp;
                        <v-btn
                            color="warning"
                            style="margin-right: 7px"
                            :disabled="disadvantagesSelected.length === 0"
                            @click="removeDisadvantage"
                        >
                          Remove
                        </v-btn>
                      </div>
                    </v-card-title>
                    <v-divider/>

                    <v-card-text>
                      <v-data-table
                          class="elevation-4"
                          disable-pagination
                          hide-default-footer
                          single-select
                          v-model="disadvantagesSelected"
                          item-key="name"
                          show-select
                          :headers="[
                           {text: 'Name', value: 'name'},
                           {text: 'Skill', value: 'skill'},
                           {text: 'Ring', value: 'ring'},
                           {text: 'Types', value: 'types'},
                        ]"
                          :dark="this.$store.state.colorVariant"
                          :items="disadvantages"
                      >
                        <template v-slot:[`item.types`]="{ item }">
                          {{ item.types ? item.types.join(', ') : '' }}
                        </template>
                      </v-data-table>
                    </v-card-text>
                  </v-card>
                </v-container>

                <v-container>
                  <v-card
                      :dark="this.$store.state.colorVariant"
                      :text-variant="this.$store.state.textVariant"
                  >
                    <v-card-title style="justify-content: space-between;">
                      <b>Abilities:</b>
                      <div style="display: inline-flex;">
                        <AddNpcAbility v-on:save="saveAbility"/>
                        &nbsp;
                        <v-btn
                            color="warning"
                            style="margin-right: 7px"
                            :disabled="abilitiesSelected.length === 0"
                            @click="removeWeapon"
                        >
                          Remove
                        </v-btn>
                      </div>
                    </v-card-title>
                    <v-divider/>

                    <v-card-text>
                      <v-data-table
                          class="elevation-4"
                          disable-pagination
                          hide-default-footer
                          single-select
                          v-model="abilitiesSelected"
                          item-key="name"
                          show-select
                          :headers="[
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
                              value: 'reference',
                            },
                        ]"
                          :dark="this.$store.state.colorVariant"
                          :items="abilities"
                      >
                        <template v-slot:[`item.reference`]="{ item }">
                          <OpenBookComponent v-if="item.reference" :item="item.reference"/>
                        </template>
                      </v-data-table>
                    </v-card-text>
                  </v-card>
                </v-container>

                <v-btn
                    color="blue darken-1"
                    text
                    @click="e1 = 1"
                >
                  Back
                </v-btn>
                <v-btn
                    color="primary"
                    @click="e1 = 3"
                >
                  Continue
                </v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-container>
                  <v-card
                      :dark="this.$store.state.colorVariant"
                      :text-variant="this.$store.state.textVariant"
                  >
                    <v-card-title style="justify-content: space-between;">
                      <b>Weapons:</b>
                      <div style="display: inline-flex;">
                        <AddNpcWeapon v-on:save="saveWeapon"/>
                        &nbsp;
                        <v-btn
                            color="warning"
                            style="margin-right: 7px"
                            :disabled="weaponSelected.length === 0"
                            @click="removeWeapon"
                        >
                          Remove
                        </v-btn>
                      </div>
                    </v-card-title>
                    <v-divider/>

                    <v-card-text>
                      <v-data-table
                          class="elevation-4"
                          disable-pagination
                          hide-default-footer
                          single-select
                          v-model="weaponSelected"
                          show-select
                          item-key="name"
                          :headers="[
                           {text: 'Name', value: 'name'},
                           {text: 'Range', value: 'range'},
                           {text: 'Damage', value: 'damage'},
                           {text: 'Deadliness', value: 'deadliness'},
                           {text: 'Book', value: 'reference'},
                        ]"
                          :dark="this.$store.state.colorVariant"
                          :items="weapons"
                      >
                        <template v-slot:[`item.range`]="{ item }">
                          {{ item.range.min }} - {{ item.range.max }}
                        </template>
                        <template v-slot:[`item.reference`]="{ item }">
                          <OpenBookComponent v-if="item.reference" :item="item.reference"/>
                        </template>
                      </v-data-table>
                    </v-card-text>
                  </v-card>
                </v-container>


                <v-container>
                  <v-card
                      :dark="this.$store.state.colorVariant"
                      :text-variant="this.$store.state.textVariant"
                  >
                    <v-card-title style="justify-content: space-between;">
                      <b>Armors:</b>
                      <div style="display: inline-flex;">
                        <AddNpcArmor v-on:save="saveArmor"/>
                        &nbsp;
                        <v-btn
                            color="warning"
                            style="margin-right: 7px"
                            :disabled="armorsSelected.length === 0"
                            @click="removeArmor"
                        >
                          Remove
                        </v-btn>
                      </div>
                    </v-card-title>
                    <v-divider/>

                    <v-card-text>
                      <v-data-table
                          class="elevation-4"
                          disable-pagination
                          hide-default-footer
                          single-select
                          v-model="armorsSelected"
                          show-select
                          item-key="name"
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
                          :items="armors"
                      >
                        <template v-slot:[`item.reference`]="{ item }">
                          <OpenBookComponent v-if="item.reference" :item="item.reference"/>
                        </template>
                      </v-data-table>
                    </v-card-text>
                  </v-card>
                </v-container>

                <v-btn
                    color="blue darken-1"
                    @click="e1 = 2"
                >
                  Back
                </v-btn>
                &nbsp;
                <v-btn
                    color="blue darken-1"
                    @click="add"
                >
                  Save
                </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import {Advantage, Book, Npc, NpcAbility, NpcArmor, NpcWeapon} from '@/domain/types/player.type';
import npcTemplates from '../../assets/data/json/npc_template.json';
import demeanorTemplates from '../../assets/data/json/demeanor.json';
import AddNpcAdvantage from '@/components/gm-panel/AddNpcAdvantage.vue';
import AddNpcAbility from '@/components/gm-panel/AddNpcAbility.vue';
import AddNpcWeapon from '@/components/gm-panel/AddNpcWeapon.vue';
import OpenBookComponent from '@/components/OpenBookComponent.vue';
import techniques from '../../assets/data/json/techniques.json';
import weaponsTemplates from '../../assets/data/json/weapons.json';
import armorsTemplates from '../../assets/data/json/armor.json';
import Vue from 'vue';
import AddNpcArmor from '@/components/gm-panel/AddNpcArmor.vue';

export default Vue.extend({
  name: 'AddNpc',
  components: {
    AddNpcAdvantage,
    AddNpcAbility,
    OpenBookComponent,
    AddNpcWeapon,
    AddNpcArmor,
  },
  data() {
    return {
      uuid: require('uuid'),

      e1: 1,
      dialog: false,
      valid: true,
      selectedTemplate: undefined,

      name: '',
      demeanor: '',
      description: '',
      portraitImage: '',

      artisan: 0,
      martial: 0,
      scholar: 0,
      social: 0,
      trade: 0,

      armors: new Array<NpcArmor>(),
      armorsSelected: new Array<NpcArmor>(),
      weapons: new Array<NpcWeapon>(),
      weaponSelected: new Array<NpcWeapon>(),
      advantages: new Array<Advantage>(),
      advantagesSelected: new Array<Advantage>(),
      disadvantages: new Array<Advantage>(),
      disadvantagesSelected: new Array<Advantage>(),
      abilities: new Array<NpcAbility>(),
      abilitiesSelected: new Array<NpcAbility>(),

      air: 1,
      fire: 1,
      earth: 1,
      water: 1,
      void: 1,

      koku: 0,
      bu: 0,
      zeni: 0,

      glory: 0,
      status: 0,
      honor: 0,

      endurance: 1,
      composure: 1,
      focus: 1,
      vigilance: 1,

      files: [],
    };
  },
  computed: {
    templates: function () {
      return npcTemplates.map(item => item.name);
    },
    demeanors: function () {
      return demeanorTemplates.map(item => item.name);
    },
  },
  methods: {
    onFileChanged: async function () {
      if (this.files === null) {
        return;
      }
      const reader = (new FileReader());
      //@ts-ignore
      reader.readAsBinaryString((this.files as File));

      reader.onload = (event) => {
        //@ts-ignore
        this.portraitImage = btoa(event.target.result);
      };
    },
    saveWeapon: function (data: NpcWeapon): void {
      this.weapons.push(data);
    },
    saveArmor: function (data: NpcArmor): void {
      this.armors.push(data);
    },
    saveAbility: function (data: NpcAbility): void {
      this.abilities.push({
        name: data.name,
        type: data.type,
        subtype: data.subtype,
        rank: data.rank,
        reference: data.reference,
      } as NpcAbility);
    },
    saveDisadvantage: function (data: { advantageName: string, advantageRing: string, advantageSkill: string, advantageTypes: string[] }): void {
      this.disadvantages.push({
        name: data.advantageName,
        ring: data.advantageRing,
        skill: data.advantageSkill,
        types: data.advantageTypes,
      } as Advantage);
    },
    saveAdvantage: function (data: { advantageName: string, advantageRing: string, advantageSkill: string, advantageTypes: string[] }): void {
      this.advantages.push({
        name: data.advantageName,
        ring: data.advantageRing,
        skill: data.advantageSkill,
        types: data.advantageTypes,
      } as Advantage);
    },

    removeDisadvantage: function (): void {
      if (this.disadvantagesSelected.length <= 0) {
        return;
      }

      const trait = this.disadvantagesSelected[0];

      for (let i = 0; i < this.disadvantages.length; i++) {
        const tmp = this.disadvantages[i];
        if (trait.name === tmp.name) {
          this.disadvantages.splice(i, 1);
          break;
        }
      }

      this.disadvantagesSelected = [];
    },

    removeAbility: function (): void {
      if (this.abilitiesSelected.length <= 0) {
        return;
      }

      const trait = this.abilitiesSelected[0];

      for (let i = 0; i < this.abilities.length; i++) {
        const tmp = this.abilities[i];
        if (trait.name === tmp.name) {
          this.abilities.splice(i, 1);
          break;
        }
      }

      this.abilitiesSelected = [];
    },

    removeWeapon: function (): void {
      if (this.weaponSelected.length <= 0) {
        return;
      }

      const trait = this.weaponSelected[0];

      for (let i = 0; i < this.weapons.length; i++) {
        const tmp = this.weapons[i];
        if (trait.name === tmp.name) {
          this.weapons.splice(i, 1);
          break;
        }
      }

      this.weaponSelected = [];
    },

    removeArmor: function (): void {
      if (this.armorsSelected.length <= 0) {
        return;
      }

      const trait = this.armorsSelected[0];

      for (let i = 0; i < this.armors.length; i++) {
        const tmp = this.armors[i];
        if (trait.name === tmp.name) {
          this.armors.splice(i, 1);
          break;
        }
      }

      this.armorsSelected = [];
    },
    removeAdvantage: function (): void {
      if (this.advantagesSelected.length <= 0) {
        return;
      }

      const trait = this.advantagesSelected[0];

      for (let i = 0; i < this.advantages.length; i++) {
        const tmp = this.advantages[i];
        if (trait.name === tmp.name) {
          this.advantages.splice(i, 1);
          break;
        }
      }

      this.advantagesSelected = [];
    },

    setTemplate: function (): void {
      if (this.selectedTemplate == undefined) {
        return;
      }

      let demeanor;
      let template;

      for (const npcTemplate of npcTemplates) {
        if (npcTemplate.name === this.selectedTemplate) {
          template = npcTemplate;
          break;
        }
      }

      if (template === undefined) {
        return;
      }

      for (const demeanorTemplate of demeanorTemplates) {
        if (demeanorTemplate.id === template.demeanor) {
          demeanor = demeanorTemplate;
          break;
        }
      }

      this.name = template.name;
      this.demeanor = demeanor?.name || '';
      this.description = template.description;

      this.artisan = template.skills.artisan;
      this.martial = template.skills.martial;
      this.scholar = template.skills.scholar;
      this.social = template.skills.social;
      this.trade = template.skills.trade;

      this.air = template.rings.air;
      this.fire = template.rings.fire;
      this.earth = template.rings.earth;
      this.water = template.rings.water;
      this.void = template.rings.void;

      this.advantages = [...template.advantages];
      this.disadvantages = [...template.disadvantages];

      const abil = new Array<NpcAbility>();

      for (const ability of template.abilities) {
        if (ability.type === 'Custom') {
          abil.push({
            type: ability.type,
            subtype: '',
            name: ability.name,
            rank: 0,
            reference: {},
          });
          continue;
        }

        for (const group of techniques) {
          if (group.name !== ability.type) {
            continue;
          }

          for (const subcategory of group.subcategories) {
            for (const technique of subcategory.techniques) {
              if (technique.name === ability.name) {
                abil.push({
                  type: group.name,
                  subtype: subcategory.name,
                  name: technique.name,
                  rank: technique.rank,
                  reference: {
                    book: technique.reference.book as Book,
                    page: technique.reference.page.toString(),
                  },
                });
                break;
              }
            }

            break;
          }
          break;
        }
      }

      this.abilities = abil;

      const weapons = [];
      for (const weapon of template.weapons) {
        for (const group of weaponsTemplates) {
          if (group.name !== weapon.type) {
            continue;
          }

          for (const entry of group.entries) {
            if (entry.name === weapon.name) {
              let damage = '';
              let deadlines = '';

              for (const grip of entry.grips) {
                for (const effect of grip.effects) {
                  if (effect.attribute === 'damage' && effect?.value_increase) {
                    damage = '/' + (entry.damage + effect?.value_increase).toString();
                  }

                  if (effect.attribute === 'deadliness' && effect?.value_increase) {
                    deadlines = '/' + (entry.deadliness + effect.value_increase).toString();
                  }
                }
              }


              weapons.push({
                name: entry.name,
                damage: entry.damage.toString() + damage,
                deadliness: entry.deadliness.toString() + deadlines,
                range: {
                  min: entry.range.min,
                  max: entry.range.max,
                },
                reference: {
                  book: entry.reference.book as Book,
                  page: entry.reference.page.toString(),
                },
              } as NpcWeapon);
              break;
            }
          }
          break;
        }
      }

      this.weapons = weapons;

      const armors = [];

      for (const armor of template.armors) {
        for (const armorTemplate of armorsTemplates) {
          if (armor !== armorTemplate.name) {
            continue;
          }

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

          armors.push({
            name: armorTemplate.name,
            superRes: superNatural,
            physRes: phys,
            rarity: armorTemplate.rarity,
            reference: {
              book: armorTemplate.reference.book as Book,
              page: armorTemplate.reference.page.toString(),
            },
          });

          break;
        }
      }


      this.armors = armors;


      this.koku = template.wealth.koku;
      this.bu = template.wealth.bu;
      this.zeni = template.wealth.zeni;

      this.glory = template.social.glory;
      this.status = template.social.status;
      this.honor = template.social.honor;

      this.endurance = template.statistics.endurance;
      this.composure = template.statistics.composure;
      this.focus = template.statistics.focus;
      this.vigilance = template.statistics.vigilance;

    },

    secondStep: function () {
      //@ts-ignore
      if (this.$refs.form.validate() === false) {
        return;
      }

      this.e1 = 2;
    },

    add: function (): void {
      let demeanor;

      for (const demeanorTemplate of demeanorTemplates) {
        if (demeanorTemplate.name === this.demeanor) {
          demeanor = demeanorTemplate;
          break;
        }
      }

      if (demeanor === undefined) {
        return;
      }

      this.$store.state.gmData.npcs.push({
        id: this.uuid.v4(),
        name: this.name,
        description: this.description,
        portraitImage: this.portraitImage,
        abilities: this.abilities,
        advantages: this.advantages,
        disadvantages: this.disadvantages,
        armors: this.armors,
        weapons: this.weapons,
        rings: {
          air: this.air,
          fire: this.fire,
          earth: this.earth,
          water: this.water,
          void: this.void,
        },
        wealth: {
          zeni: this.zeni,
          koku: this.koku,
          bu: this.bu,
        },
        skills: {
          artisan: this.artisan,
          martial: this.martial,
          scholar: this.scholar,
          social: this.social,
          trade: this.trade,
        },
        statistics: {
          endurance: this.endurance,
          composure: this.composure,
          focus: this.focus,
          vigilance: this.vigilance,
        },
        social: {
          honor: this.honor,
          glory: this.glory,
          status: this.status,
        },
        demeanor: demeanor !== undefined ? {
          id: demeanor.id,
          name: demeanor.name,
          rings: {
            air: demeanor.rings.air,
            fire: demeanor.rings.fire,
            earth: demeanor.rings.earth,
            water: demeanor.rings.water,
            void: demeanor.rings.void,
          },
        } : undefined,
      } as Npc);
      this.dialog = false;
    },
  },
});
</script>