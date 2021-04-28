<template>
  <v-container>
    <v-form class="mb-3">
      <v-text-field v-model="evento.titulo" label="Titulo" />
      <v-text-field v-model="evento.nombre" label="Nombre" />
      <v-btn type="submit" color="success" @click.prevent="addEvento(evento)">
        Guardar
      </v-btn>
    </v-form>

    <v-card v-for="(event, index) in eventos" :key="index" class="mb-3">
      <v-card-title> {{ event.titulo }} </v-card-title>
      <v-card-subtitle> {{ event.creadoPor }} </v-card-subtitle>
      <v-card-text> {{ getDate(event.fechaCreacion.seconds) }} </v-card-text>
      <v-card-actions>
        <v-btn> Ver </v-btn>
        <v-btn> Hecho </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    evento: {
      titulo: '',
      nombre: ''
    }
  }),

  computed: {
    ...mapState(['eventos'])
  },

  created () {},

  methods: {
    ...mapActions(['addEvento']),
    getDate (timestamp) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(timestamp * 1000).toLocaleString('es-Es', options)
    }
  }

}
</script>

<style>

</style>
