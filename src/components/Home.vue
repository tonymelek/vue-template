<script>
export default {
  name: 'Home Page',
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
  <h1 class="text-danger text-center" @click="setLastName">Tony {{someDataFromStore}}</h1>
</template>

<style scoped>

</style>
