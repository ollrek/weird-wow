<template>
  <div class="container has-text-centered columns is-vcentered is-centered is-mobile is-multiline">
    <span v-if="stat && stat.isTop" class="column is-narrow">
      <img class="image is-32x32" :src="'medal.png'" />
    </span>
    <span class="column is-size-3 is-narrow">
      <strong>{{stat.quantity}}</strong>
    </span>
    <span class="column is-size-4 is-size-6-mobile is-narrow">{{stat.name}}</span>
    <!-- eslint-disable-next-line -->
    <span v-if="stat && stat.highest" class="column is-small is-italic is-narrow is-multiline">{{stat.highest}}</span>
  </div>
</template>

<script>
export default {
  name: 'StatsItem',
  props: ['stat'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  margin: 1.5rem auto;
}
</style>
