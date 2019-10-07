<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <div class="columns is-mobile is-vcentered">
          <div class="column">
            <span class="title">WEIRD</span>
          </div>
          <div class="column is-narrow">
            <img
              class="image"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/WoW_icon.svg/64px-WoW_icon.svg.png"
              alt
            />
          </div>
        </div>
      </b-navbar-item>
    </template>
    <template slot="start">
      <div class="start-column columns container is-mobile">
        <b-navbar-item
          class="column has-text-centered"
          tag="router-link"
          :to="{ path: '/tops' }"
        >TOPS</b-navbar-item>
        <b-navbar-item
          class="column has-text-centered"
          tag="router-link"
          :to="{ path: '/changelog' }"
        >Changelog</b-navbar-item>
      </div>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'HeaderItem',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-item img {
  max-height: inherit;
}

.navbar-item,
nav >>> .navbar-start {
  flex-grow: 1;
  justify-content: center;
}

nav {
  display: block;
}

.start-column {
  margin: auto;
}
</style>
