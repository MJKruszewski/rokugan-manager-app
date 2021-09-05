<template>
  <div id="app" >
  <v-app :class="this.$store.state.colorVariant ? 'theme--dark' : 'theme--light'">

    <SideMenu/>
    <TopMenu/>

    <v-main>
      <v-container fluid>
        <transition name="fade">
          <router-view/>
        </transition>
      </v-container>
    </v-main>
  </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SideMenu from '@/components/menu/SideMenu.vue';
import TopMenu from '@/components/menu/TopMenu.vue';

export default Vue.extend({
  name: 'App',
  components: {TopMenu, SideMenu},
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500;1,700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  background-color: #272727;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

*::-webkit-scrollbar {
  width: 12px;
}
*::-webkit-scrollbar-track {
  background-color: #272727;
}
*::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(146, 146, 146, 0.6);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
