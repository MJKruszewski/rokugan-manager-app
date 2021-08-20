<template>
  <v-card
      :dark="this.$store.state.colorVariant"
  >
    <v-card-title>
      <b>Possible opportunities:</b>
    </v-card-title>
    <v-divider/>
    <v-card-text>
      <v-data-table
          :dark="this.$store.state.colorVariant"
          class="elevation-4"
          disable-pagination
          hide-default-footer
          single-select
          hide-default-header
          :headers="[
                           {text: 'Cost', value: 'price'},
                           {text: 'Category', value: 'category'},
                           {text: 'Description', value: 'description'},
                        ]"
          :fields="['cost', 'category', 'description']"
          small striped hover :items="getOpportunitiesList"
      >
        <template v-slot:item.price="{ item }">
          <v-row align="center" justify="center" style="min-width: 45px">
            <template v-for="k in item.price">
              <v-img width="20px" v-bind:key="k + uuid.v4()" src="../../assets/img/dice/opportunity_red.png"/>
            </template>

            <v-icon :color="'#cc2338'" v-if="item.extended">mdi-plus-box-outline</v-icon>
          </v-row>
        </template>
        <template v-slot:item.category="{ item }">
          {{ item.category }}
        </template>
        <template v-slot:item.description="{ item }">
          <div v-html="item.description" style="display:inline;"></div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script lang="ts" >
import opportunities, {OpportunityParams} from "@/domain/consts/opportunities";
import Vue from "vue";
import {RingEnum} from "@/domain/types/ring.type";

export default Vue.extend({
  name: 'OportunitiesComponent',
  data() {
    return {
      uuid: require("uuid"),
    }
  },
  computed: {
    getOpportunitiesList: function () {
      if (this.$store.state.mainRoll.opportunities == 0) {
        return [];
      }

      const selectedRing: RingEnum = this.$store.state.mainRoll.selectedRing.toLowerCase()

      let result = [];
      let general: OpportunityParams[] = opportunities.general[selectedRing] || [];
      let downtime: OpportunityParams[] = opportunities.downtime[selectedRing] || [];
      let common: OpportunityParams[] = opportunities.general['common'] || [];
      general = general.filter(val => val.price <= this.$store.state.mainRoll.opportunities).map((val) => {
        return {
          ...val,
          category: 'General'
        }
      });
      downtime = downtime.filter(val => val.price <= this.$store.state.mainRoll.opportunities).map((val) => {
        return {
          ...val,
          category: 'Free time'
        }
      });
      common = common.filter(val => val.price <= this.$store.state.mainRoll.opportunities).map((val) => {
        return {
          ...val,
          category: 'General (Common)'
        }
      });


      if (['Sentiment', 'Meditation', 'Tactics', 'Command'].includes(this.$store.state.mainRoll.selectedSkill)) {
        let initiative: OpportunityParams[] = opportunities.initiative[selectedRing] || [];
        initiative = initiative.filter(val => val.price <= this.$store.state.mainRoll.opportunities).map((val) => {
          return {
            ...val,
            category: 'Initiative'
          }
        });

        result.push(...initiative);
      }

      if (this.$store.state.mainRoll.selectedSkill.includes('Martial')) {
        let martial: OpportunityParams[] = opportunities.martial[selectedRing] || [];
        martial = martial.filter(val => val.price <= this.$store.state.mainRoll.opportunities).map((val) => {
          return {
            ...val,
            category: 'Conflict'
          }
        });

        result.push(...martial);
      }

      result.push(...general);
      result.push(...common);
      result.push(...downtime);

      return result;
    },
  },
})
</script>
