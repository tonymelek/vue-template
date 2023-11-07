<script>
export default {
  name: 'about-us',
  data: () => ({

  }),
  computed: {
    someDataFromStore() {
      return this.$store.state.someDataFromStore
    }
  },
  methods: {
    setLastName() {
      this.$store.commit('setSomeData', 'Koko')
    }
  }
}
</script>

<template>
  <h1 tabindex="0" class="text-danger text-center" @click="setLastName">About Us page</h1>
</template>

<style scoped>

</style>
