<template>
  <v-app dark>
    <the-nabvar />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import TheNabvar from '~/components/TheNabvar.vue'
export default {
  components: { TheNabvar },
  data () {
    return {
      fixed: false
    }
  }
}
</script>
