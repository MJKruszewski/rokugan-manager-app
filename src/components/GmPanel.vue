<template>
  <v-row>
    <v-col :sm="12" :md="4">
      <v-row>
        <GmPlayersList/>
      </v-row>
    </v-col>

    <v-col :sm="12" :md="8">
      <v-row>
        <GmNpcList/>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import GmPlayersList from '@/components/gm-panel/GmPlayersList.vue';
import GmNpcList from '@/components/gm-panel/GmNpcList.vue';

export default Vue.extend({
  name: 'GmPanel',
  components: {GmPlayersList, GmNpcList},
  data: () => {
    return {
      npcHeaders: [
        {
          text: 'Name',
          value: 'name',
        },
      ],
      npcList: [
        {
          name: 'Janusz',
        },
      ],
    };
  },
  methods: {

  },
});
</script>

