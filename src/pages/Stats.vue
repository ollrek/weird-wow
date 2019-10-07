<template>
  <div>
    <section class="section">
      <div class="columns">
        <character-input
          class="column is-three-fifths is-offset-one-fifth"
          @submit="fetchCharacterData"
        ></character-input>
      </div>
    </section>
    <section v-if="data && data.data && data.data.getRandomStats" class="section">
      <stat-item
        :stat="stat"
        v-for="(stat, index)  in data.data.getRandomStats"
        :key="`stat-${index}`"
      ></stat-item>
    </section>
    <section v-if="data && data.errors">
      <div class="container has-text-danger has-text-centered">{{data.errors[0].message}}</div>
    </section>
    <b-loading :active.sync="appIsLoading"></b-loading>
  </div>
</template>
<script>
import axios from 'axios';
import CharacterInputItem from '../components/CharacterInputItem.vue';
import StatItem from '../components/StatItem.vue';

export default {
  name: 'app',
  components: {
    'character-input': CharacterInputItem,
    'stat-item': StatItem,
  },
  data() {
    return {
      data: {},
      appIsLoading: false,
    };
  },
  methods: {
    async fetchCharacterData(e) {
      this.appIsLoading = true;
      this.data = {};
      try {
        const res = await axios.post('/graphql', {
          query: `query GetRandomStats($character : CharacterInput!){ 
            getRandomStats(character: $character) {
          name,
          quantity,
          highest,
          isTop
        }
        }
      `,
          variables: {
            character: e,
          },
        });
        this.data = res.data;
      } catch {
        this.data.errors.message = 'Error fetching data from Blizzard API.';
      }
      this.appIsLoading = false;
    },
  },
};
</script>
