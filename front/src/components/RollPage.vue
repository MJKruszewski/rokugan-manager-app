<template>
  <v-row>
    <v-col :sm="12" :md="5">
      <v-row>
        <v-col :md="12">
          <SelectRingComponent/>
        </v-col>
      </v-row>

      <v-row class="mt-5">
        <v-col :md="12">
          <SelectSkillComponent/>
        </v-col>
      </v-row>
    </v-col>
    <v-col :sm="12" :md="7">
      <v-row>
        <v-col :cols="12">
          <SamuraiStatus/>
        </v-col>
      </v-row>
      <v-row class="mt-5">
        <v-col :cols="12">
          <MakeRollComponent/>
        </v-col>
      </v-row>
      <v-row class="mt-5">
        <v-col :sm="12">
          <OportunitiesComponent/>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import SamuraiStatus from "@/components/roll-page/SamuraiStatus.vue";
import Vue from "vue";
import MakeRollComponent from "@/components/roll-page/MakeRollComponent.vue";
import SelectRingComponent from "@/components/roll-page/SelectRingComponent.vue";
import SelectSkillComponent from "@/components/roll-page/SelectSkillComponent.vue";
import OportunitiesComponent from "@/components/roll-page/OportunitiesComponent.vue";

export default Vue.extend({
  name: 'RollPage',
  components: {
    OportunitiesComponent,
    SelectSkillComponent,
    SelectRingComponent,
    MakeRollComponent,
    SamuraiStatus
  },
})
</script>
