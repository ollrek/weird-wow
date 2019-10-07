<template>
  <div>
    <section class="section container">
      <b-field>
        <b-input
          placeholder="Search for stats or characters ..."
          type="search"
          icon="magnify"
          v-model="keywordDebounced"
        ></b-input>
      </b-field>
    </section>
    <section v-if="data && data.data && data.data.tops" class="section container">
      <b-table
        :data="filteredData"
        :mobile-cards="false"
        :paginated="true"
        :pagination-simple="true"
      >
        <template slot-scope="props">
          <!-- eslint-disable-next-line -->
          <b-table-column field="stat.name" label="Stat" sortable>
            {{ props.row.stat.name }}
            <span vi-if="props.row.stat.highest" class="is-size-6 is-italic">{{props.row.stat.highest}}</span>
          </b-table-column>
          <!-- eslint-disable-next-line -->
          <b-table-column field="stat.quantity" label="Quantity">{{ props.row.stat.quantity }}</b-table-column>
          <b-table-column
            field="character.name"
            label="Character"
            sortable
          >{{ props.row.character.name | capitalize }}</b-table-column>
          <b-table-column label="Realm">
            <!-- eslint-disable-next-line -->
            {{ props.row.character.origin | upperCase }}-{{props.row.character.realm | capitalize}}
          </b-table-column>
        </template>
      </b-table>
    </section>
    <section v-if="data && data.errors">
      <div class="container has-text-danger has-text-centered">{{data.errors[0].message}}</div>
    </section>
    <b-loading :active.sync="appIsLoading"></b-loading>
  </div>
</template>
<script>
import axios from 'axios';
import _ from 'lodash';

export default {
  name: 'app',
  data() {
    return {
      data: {},
      keyword: '',
      appIsLoading: false,
    };
  },
  beforeMount() {
    this.fetchTops();
  },
  filters: {
    upperCase(value) {
      return _.upperCase(value);
    },
    capitalize(value) {
      return _.capitalize(value);
    },
  },
  computed: {
    filteredData() {
      const searchValue = this.keyword.toLowerCase();
      if (!searchValue || searchValue === '' || searchValue.length < 4) {
        return this.data.data.tops;
      }
      const updatedList = this.data.data.tops.filter(item => ['stat.name', 'character.name'].some(
        key => _.get(item, key)
          .toString()
          .toLowerCase()
          .search(searchValue) !== -1,
      ));
      return updatedList;
    },
    keywordDebounced: {
      get() {
        return this.keyword;
      },
      set: _.debounce(function x(newValue) {
        this.keyword = newValue;
      }, 500),
    },
  },
  methods: {
    async fetchTops() {
      this.appIsLoading = true;
      this.data = {};
      try {
        const res = await axios.post('/graphql', {
          query: `query GetTops{ 
            tops {
          stat {
            name,
            quantity,
            highest
          }, 
          character {
            name,
            realm,
            origin,
          }
        }
        }
      `,
        });
        this.data = res.data;
      } catch (e) {
        this.data.errors.message = 'Error while getting data.';
      }
      this.appIsLoading = false;
    },
  },
};
</script>
