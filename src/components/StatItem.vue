<template>
  <div class="container has-text-centered">
      <span class="is-size-3"><strong>{{stat.quantity}} </strong></span><span class="is-size-4">{{stat.name}} </span><span class="is-small is-italic">{{stat.highest || ""}}</span>
  </div>
</template>

<script>
export default {
  name: "StatsItem",
  props: ["stat"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  margin: 1.5rem auto;
}
</style>
