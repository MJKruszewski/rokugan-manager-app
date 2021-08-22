<template>
  <div style="display: inline-flex;" v-if="item.book !== '' && item.book !== null">
    <div style="display: inline-flex" v-if="$store.state.server.bookFiles[item.book] === null">{{ item.book + ' (' + item.page + ')'}}</div>
    <v-btn v-else v-on:click="openBook(item.book, item.page)" color="primary">Open</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Book} from '@/domain/types/player.type';

export default Vue.extend({
name: 'OpenBookComponent',
  props: {
    item: Object,
  },
  methods: {
    openBook(book: Book, page: number) {
      const adjusted = parseInt(page.toString()) + 1;
      console.log('open: ', this.$store.state.server.bookFiles[book] + '#page=' + adjusted);
      window.open(this.$store.state.server.bookFiles[book] + '#page=' + adjusted, '_blank');
    },
  },
});
</script>

<style scoped>

</style>