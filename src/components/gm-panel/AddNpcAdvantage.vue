<template>
  <v-dialog
      v-model="addDialog"
      dark
      persistent
      max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="success"
          dark
          v-bind="attrs"
          v-on="on"
      >
        Add
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Add Disadvantage</span>
      </v-card-title>
      <v-card-text>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="Name"
                    v-model="advantageName"
                    :rules="[
                    v => !!v || 'Name is required',
                  ]"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                    label="Skill"
                    v-model="advantageSkill"
                    :items="['Artisan', 'Martial', 'Scholar', 'Social', 'Trade']"
                    :rules="[v => !!v || 'Skill is required',]"
                    required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                    label="Ring"
                    v-model="advantageRing"
                    :items="['Air', 'Fire', 'Water', 'Earth', 'Void']"
                    :rules="[
                    v => !!v || 'Ring is required',
                  ]"
                    required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                    label="Types"
                    v-model="advantageTypes"
                    :items="types"
                    :rules="[
                    v => !!v || 'Type is required',
                  ]"
                    multiple
                    required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue darken-1"
            text
            @click="addDialog = false"
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
import Vue from 'vue';

export default Vue.extend({
  name: 'AddNpcAdvantage',
  data() {
    return {
      addDialog: false,
      valid: true,
      types: [
        'Interpersonal',
        'Interpersonal (Name)',
        'Social',
        'Mental',
        'Mental and Interpersonal (Culture)',
        'Spiritual',
        'Physical',
        'Physical (Appearance)',
        'Virtue',
        'Curse',
        'Scar',
        'Physical or Mental',
        'Flaw',
        'Fame',
        'Martial',
        'Infamy',
      ],

      advantageName: undefined,
      advantageSkill: undefined,
      advantageRing: undefined,
      advantageTypes: undefined,
    };
  },
  methods: {
    save: function () {
      //@ts-ignore
      if (this.$refs.form.validate() === false) {
        return;
      }

      this.$emit('save', {
        advantageName: this.advantageName,
        advantageSkill: this.advantageSkill,
        advantageRing: this.advantageRing,
        advantageTypes: this.advantageTypes,
      });
      this.addDialog = false;
      this.advantageName = undefined;
      this.advantageSkill = undefined;
      this.advantageRing = undefined;
      this.advantageTypes = undefined;
    },
  },
});
</script>

<style scoped>

</style>