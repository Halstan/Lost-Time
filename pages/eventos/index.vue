<template>
  <v-container>
    <v-dialog
      v-model="isLoading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="info"
        dark
      >
        <v-card-text>
          Por favor espere
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
    <h2 class="text-center display-3">
      Eventos
    </h2>
    <v-form class="mb-3">
      <v-text-field v-model="evento.titulo" label="Titulo" counter="30" />
      <v-text-field v-model="evento.nombre" label="Nombre" counter="30" />
      <v-btn
        v-show="!isEditable"
        class="mb-3"
        block
        type="submit"
        color="success"
        :disabled="tituloRequerido || nombreRequerido"
        @click.prevent="insertEvento"
      >
        Guardar
      </v-btn>
      <v-btn
        v-show="isEditable"
        class="mb-3"
        block
        type="submit"
        color="success"
        :disabled="tituloRequerido || nombreRequerido"
        @click.prevent="updEvento"
      >
        Actualizar
      </v-btn>
      <v-btn
        v-show="isEditable"
        class="mb-3"
        block
        color="warning"
        @click.prevent="cancelar"
      >
        Cancelar
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
        <v-btn :color="event.isDone ? 'success' : 'info' " :disabled="event.isDone" @click="buscar(event.id)">
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
import { db } from '@/plugins/firebase'
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    evento: {
      id: '',
      titulo: '',
      nombre: '',
      isDone: false
    },
    isEditable: false
  }),

  computed: {
    ...mapState(['eventos', 'isLoading']),
    tituloRequerido () {
      return this.evento.titulo === ''
    },
    nombreRequerido () {
      return this.evento.nombre === ''
    }
  },

  created () {},

  methods: {
    ...mapActions(['addEvento', 'madeEvent', 'updateEvento', 'changeLoading']),
    insertEvento () {
      delete this.evento.id
      delete this.evento.isDone
      this.addEvento(this.evento)
      this.evento = {
        id: '',
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
    },
    async buscar (id) {
      this.changeLoading(true)
      try {
        const res = await db.collection('eventos').doc(id).get()
        const data = res.data()
        this.evento = data
        this.evento.titulo = data.titulo
        this.evento.id = res.id
        this.evento.nombre = data.creadorPor
        this.isEditable = true
      } catch (error) {
        console.log(error)
      } finally {
        this.changeLoading(false)
      }
    },
    updEvento () {
      this.updateEvento(this.evento)
    },
    cancelar () {
      this.isEditable = false
      this.evento = {
        titulo: '',
        nombre: ''
      }
    }
  }

}
</script>

<style>

</style>
