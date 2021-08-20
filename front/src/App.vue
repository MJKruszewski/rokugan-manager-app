<template>
  <div id="app" >
  <v-app :class="this.$store.state.colorVariant ? 'theme--dark' : 'theme--light'">
    <v-navigation-drawer
        app
        permanent
        expand-on-hover
        style="max-height: 100%"
        :dark="this.$store.state.colorVariant"
    >
      <v-list v-if="this.$store.state.player !== undefined">
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img size="128" :src="playerAvatar"/>
          </v-list-item-avatar>
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
          <v-list-item link v-on:click="$router.push('main')" >
            <v-list-item-icon>
              <v-icon>mdi-dice-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item link v-on:click="$router.push('background')" :disabled="this.$store.state.player === undefined">
            <v-list-item-icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Background</v-list-item-title>
          </v-list-item>

          <v-list-item link v-on:click="$router.push('personal-traits')" :disabled="this.$store.state.player === undefined">
            <v-list-item-icon>
              <v-icon>mdi-yin-yang</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Personal Traits</v-list-item-title>
          </v-list-item>

          <v-list-item link v-on:click="$router.push('bonds')" :disabled="this.$store.state.player === undefined">
            <v-list-item-icon>
              <v-icon>mdi-account-switch</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Bonds</v-list-item-title>
          </v-list-item>

          <v-list-item link v-on:click="$router.push('techniques')" :disabled="this.$store.state.player === undefined">
            <v-list-item-icon>
              <v-icon>mdi-cards-playing-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Techniques</v-list-item-title>
          </v-list-item>

          <v-list-item link v-on:click="$router.push('equipment')" :disabled="this.$store.state.player === undefined">
            <v-list-item-icon>
              <v-icon>mdi-bag-personal</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Equipment</v-list-item-title>
          </v-list-item>

          <v-list-item link v-on:click="$router.push('advancement')" :disabled="this.$store.state.player === undefined">
            <v-list-item-icon>
              <v-icon>mdi-school</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Advancement</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dense :dark="this.$store.state.colorVariant">
      <v-img :src="this.getClanImage()" max-width="35px"></v-img>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>
              mdi-file
            </v-icon>
          </v-btn>
        </template>

        <v-list :dark="this.$store.state.colorVariant">
          <v-list-item link>
            <v-list-item-title>New</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>Open</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>Save</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>
              mdi-tools
            </v-icon>
          </v-btn>
        </template>

        <v-list :dark="this.$store.state.colorVariant">
          <v-list-item link>
            <v-list-item-title>Open application data folder</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title v-on:click="loadXml()">Import XML</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>


      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>
              mdi-discord
            </v-icon>
          </v-btn>
        </template>

        <v-list :dark="this.$store.state.colorVariant">
            <template v-for="server in $store.state.server.hostList">
              <v-list-item link :key="server.text + uuid.v4()" v-on:click="saveHook(server.value)">
                <v-list-item-title>{{server.text}}</v-list-item-title>
              </v-list-item>
            </template>
        </v-list>
      </v-menu>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-file-input
          id="openXml"
          ref="openXml"
          v-model="xmlFile"
          :state="Boolean(xmlFile)"
          placeholder="Load your character..."
          :variant="this.$store.state.colorVariant"
          accept=".xml"
          drop-placeholder="Drop file here..."
          style="display: none"
      ></v-file-input>

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
import {getClanColor, getClanMon, getHook} from "@/domain/common";
import Vue from "vue";
import {LoadCard} from "@/domain/services/load-card";

export default Vue.extend({
  name: 'App',
  computed: {
    playerAvatar() {
      if (this.$store.state.player === undefined) {
        return '';
      }

      // return 'data:' + this.detectMimeType(this.$store.state.player.image) + 'image/png;charset=utf-8;base64,' + this.$store.state.player.image;
      return 'data:image/png;charset=utf-8;base64,' + this.$store.state.player.portraitImage;
    }
  },
  data: () => {
    return {
      uuid: require("uuid"),
      selectedMenu: 0,
      xmlFile: undefined,
      hook: getHook(),
    }
  },
  watch: {
    xmlFile: async function (val) {
      if (val === undefined || val === '') {
        return;
      }

      const xml = new DOMParser().parseFromString(await val.text(), "application/xml");
      this.$store.state.player = await LoadCard.importCard(xml);

    }
  },
  methods: {
    loadXml: function () {
      document.getElementById("openXml")?.click();
    },
    // detectMimeType: function (b64: string) {
    //   const signatures = {
    //     JVBERi0: "application/pdf",
    //     R0lGODdh: "image/gif",
    //     R0lGODlh: "image/gif",
    //     iVBORw0KGgo: "image/png"
    //   };
    //
    //   for (let s in signatures) {
    //     if (b64.indexOf(s) === 0) {
    //       return signatures[s];
    //     }
    //   }
    // },
    saveHook: function (host: string) {
      this.$store.state.server.host = host;

      localStorage.setItem('server', JSON.stringify(this.$store.state.server));
    },
    getClanImage: function () {
      console.log('getClanMon(this.$store.state.player.familyData.clan)', getClanMon(this.$store.state.player?.familyData?.clan))
      return getClanMon(this.$store.state.player?.familyData?.clan)
    },
    getColor: function () {
      return getClanColor(this.$store.state.player?.familyData?.clan)
    },
  }
})
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

.background-custom {
  /*width: 100%;*/
  /*height: 100%;*/
  /*background-image: url("./assets/background.jpg") ;*/
  /*background-repeat: no-repeat;*/
  /*background-size: cover;*/

  /*top: 0px !important;*/
  /*position: fixed;*/
  /*overflow: auto;*/
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
