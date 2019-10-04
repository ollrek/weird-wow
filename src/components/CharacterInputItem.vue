<template>
  <form id="character-input-item" ref="character-input" @submit.prevent="submit">
    <div class="field has-addons">
      <p class="control">
        <span class="select">
          <select name="origin" v-model="character.origin" required>
            <option value="eu">EU</option>
            <option value="us">US</option>
          </select>
        </span>
      </p>
      <p class="control">
        <input
          name="realm"
          v-model="character.realm"
          class="input"
          type="text"
          placeholder="Realm"
          required
        />
      </p>
      <p class="control is-expanded">
        <input
          name="name"
          v-model="character.name"
          class="input"
          type="text"
          placeholder="Character"
          required
        />
      </p>
      <div class="control">
        <button class="button" type="submit">Give some !</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'CharacterInputItem',
  data() {
    return {
      character: {
        origin: 'eu',
        // realm: "",
        // name: ""
      },
    };
  },
  methods: {
    submit() {
      this.$emit('submit', this.character);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
