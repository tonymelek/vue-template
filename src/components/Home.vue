<script>
export default {
  name: 'home-page',
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
  <router-link to="/payments">Payments</router-link>
</template>

<style scoped>

</style>
