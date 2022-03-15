<template>
  <v-navigation-drawer
      app
      permanent

      style="max-height: 100%"
      :mini-variant.sync="clipped"
      :dark="this.$store.state.colorVariant"
  >
    <v-list v-if="this.$store.state.player !== undefined">
      <v-list-item class="px-2" v-if="this.$store.state.player.portraitImage !== undefined && this.$store.state.player.portraitImage.length > 0">
        <v-img style="border-radius: 5px" :src="playerAvatar"/>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ this.$store.state.player.familyData.mon }} {{ this.$store.state.player.familyData.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ this.$store.state.player.familyData.clan }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list
        nav
        dense
    >
      <v-list-item-group v-model="selectedMenu">
        <v-list-item link v-on:click="$router.push({path: '/'})" >
          <v-list-item-icon>
            <v-icon>mdi-dice-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Roll</v-list-item-title>
        </v-list-item>

        <v-list-item link v-on:click="$router.push({path: '/background'})" :disabled="this.$store.state.player === undefined">
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Background</v-list-item-title>
        </v-list-item>

        <v-list-item link v-on:click="$router.push({path: '/personal-traits'})" :disabled="this.$store.state.player === undefined">
          <v-list-item-icon>
            <v-icon>mdi-yin-yang</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Personal Traits</v-list-item-title>
        </v-list-item>

        <v-list-item link v-on:click="$router.push({path: '/techniques'})" :disabled="this.$store.state.player === undefined">
          <v-list-item-icon>
            <v-icon>mdi-cards-playing-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Techniques</v-list-item-title>
        </v-list-item>

        <v-list-item link v-on:click="$router.push({path: '/equipment'})" :disabled="this.$store.state.player === undefined">
          <v-list-item-icon>
            <v-icon>mdi-bag-personal</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Equipment</v-list-item-title>
        </v-list-item>

        <v-list-item link v-on:click="$router.push({path: '/advancement'})" :disabled="this.$store.state.player === undefined">
          <v-list-item-icon>
            <v-icon>mdi-school</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Advancement</v-list-item-title>
        </v-list-item>

        <v-spacer/>

        <v-list-item link v-on:click="$router.push({path: '/gmpanel'})">
          <v-list-item-icon>
            <v-icon>mdi-arm-flex</v-icon>
          </v-list-item-icon>
          <v-list-item-title>GM Panel</v-list-item-title>
        </v-list-item>

        <v-list-item link v-on:click="$router.push({path: '/settings'})">
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <template v-slot:append>
      <v-list-item link v-on:click="clipped = !clipped">
        <v-list-item-icon>
          <v-icon>mdi-chevron-{{ !clipped ? 'left' : 'right' }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Minimize</v-list-item-title>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SideMenu',
  data: () => {
    return {
      selectedMenu: 0,
      clipped: true,
    };
  },
  computed: {
    playerAvatar() {
      if (this.$store.state.player === undefined || this.$store.state.player.portraitImage === undefined || this.$store.state.player.portraitImage.length <= 0) {
        return '';
      }

      // return 'data:' + this.detectMimeType(this.$store.state.player.image) + 'image/png;charset=utf-8;base64,' + this.$store.state.player.image;
      return 'data:image/png;charset=utf-8;base64,' + this.$store.state.player.portraitImage;
    },
  },
});
</script>

<style scoped>

</style>