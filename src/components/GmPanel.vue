<template>
  <v-col cols="12">
    <v-row>
      <v-col>
        <v-card
            :dark="this.$store.state.colorVariant"
            :text-variant="this.$store.state.textVariant"
        >
          <v-card-title style="justify-content: space-between;">
            <b>NPCs:</b>
            <v-dialog
                v-model="dialog"
                hide-overlay
                transition="dialog-bottom-transition"
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
                <v-toolbar
                    dark
                    color="primary"
                >
                  <v-btn
                      icon
                      dark
                      @click="dialog = false"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Settings</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn
                        dark
                        text
                        @click="dialog = false"
                    >
                      Save
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-list
                    three-line
                    subheader
                >
                  <v-subheader>User Controls</v-subheader>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Content filtering</v-list-item-title>
                      <v-list-item-subtitle>Set the content filtering level to restrict apps that can be downloaded</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Password</v-list-item-title>
                      <v-list-item-subtitle>Require password for purchase or use password to restrict purchase</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list
                    three-line
                    subheader
                >
                  <v-subheader>General</v-subheader>
                  <v-list-item>
                    <v-list-item-action>
                      <v-checkbox v-model="notifications"></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Notifications</v-list-item-title>
                      <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-action>
                      <v-checkbox v-model="sound"></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Sound</v-list-item-title>
                      <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-action>
                      <v-checkbox v-model="widgets"></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Auto-add widgets</v-list-item-title>
                      <v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-card-text>
            <v-data-table
                class="elevation-4"
                disable-pagination
                hide-default-footer
                single-select
                :headers="this.npcHeaders"
                :dark="this.$store.state.colorVariant"
                :items="this.npcList"
            >
            </v-data-table>
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'GmPanel',
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
});
</script>

<style scoped>

</style>