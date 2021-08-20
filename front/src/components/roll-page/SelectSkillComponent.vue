<template>
  <v-card
      :dark="this.$store.state.colorVariant"

      :text-variant="this.$store.state.textVariant"
      class="container-color"
  >
    <v-card-title>
      <b>Select skill:</b>
    </v-card-title>
    <v-divider/>

    <v-card-text v-if="$store.state.player === undefined">
      <v-skeleton-loader
          type="table"
      ></v-skeleton-loader>
    </v-card-text>
    <v-card-text class="text-center" v-else>
      <v-data-table
          class="elevation-4"
          :dark="this.$store.state.colorVariant"
          disable-pagination
          dense
          hide-default-footer
          single-select
          hide-default-header
          :headers="[
                           {text: 'Name', value: 'name'},
                           {text: 'Group', value: 'group', },
                           {text: 'Value', value: 'value'},
                        ]"
          group-by="group"
          :items="this.$store.state.player.skills"
          @click:row="skillSelect"
      ></v-data-table>
    </v-card-text>

  </v-card>
</template>
<script lang="ts">
import {Skill} from "@/domain/types/skill.type";
import Vue from "vue";

export default Vue.extend({
  name: 'SelectSkillComponent',
  data() {
    return {
      uuid: require("uuid"),
    }
  },
  methods: {
    skillSelect: function (val: Skill) {
      if (this.$store.state.mainRoll.isDuringRoll) {
        return;
      }

      this.$store.state.mainRoll.selectedSkill = val.name;
      this.$store.state.mainRoll.selectedSkillValue = val.value;

      this.$store.state.mainRoll.wDices = [];
      this.$store.state.mainRoll.selectedIds = [];

      for (let i = 0; i < this.$store.state.mainRoll.selectedSkillValue; i++) {
        this.$store.state.mainRoll.wDices.push({
          id: this.uuid.v4(),
          img: "white.png"
        });
      }

      localStorage.setItem('mainRoll', JSON.stringify(this.$store.state.mainRoll));
    },
  }
})
</script>
<style>

.container-color {
  /*background-color: #343a40e6 !important;*/
}

</style>