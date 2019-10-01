<template>
  <div>
    <header-custom></header-custom>
    <router-view />
  </div>
</template>
<script>
import HeaderItem from "@/components/HeaderItem";

export default {
  name: "app",
  components: {
    "header-custom": HeaderItem
  }
};
</script>