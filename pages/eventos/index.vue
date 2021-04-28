<template>
  <v-container>
    <h2 class="text-center display-3">
      Eventos
    </h2>
    <v-form class="mb-3">
      <v-text-field v-model="evento.titulo" label="Titulo" />
      <v-text-field v-model="evento.nombre" label="Nombre" />
      <v-btn type="submit" color="success" @click.prevent="insertEvento">
        Guardar
      </v-btn>
    </v-form>

    <v-card v-for="(event, index) in eventos" :key="index" class="mb-3">
      <v-card-title class="display-3">
        {{ event.titulo }}
      </v-card-title>
      <v-card-subtitle class="display-6">
        {{ event.creadoPor }}
      </v-card-subtitle>
      <v-card-text>
        <p>{{ getDate(event.fechaCreacion.seconds) }}</p>
        <p> {{ event.isDone ? 'Hecho' : 'No hecho' }} </p>
      </v-card-text>
      <v-card-actions>
        <v-btn :color="event.isDone ? 'success' : 'info' " :disabled="event.isDone">
          Editar
        </v-btn>
        <v-btn :disabled="event.isDone" @click="isDone(event.id)">
          Hecho
        </v-btn>
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
    ...mapActions(['addEvento', 'madeEvent']),
    insertEvento () {
      this.addEvento(this.evento)
      this.evento = {
        titulo: '',
        nombre: ''
      }
    },
    getDate (timestamp) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(timestamp * 1000).toLocaleString('es-Es', options)
    },
    isDone (id) {
      this.madeEvent(id)
    }
  }

}
</script>

<style>

</style>
