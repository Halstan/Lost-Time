/* eslint-disable no-console */
import { db } from '@/plugins/firebase'

export const state = () => ({
  eventos: [],
  evento: {},
  isLoading: false
})
export const mutations = {
  setEventos (state, payload) {
    state.eventos = payload
  },
  setEvento (state, payload) {
    state.eventos.push(payload)
  },
  updateEvento (state, payload) {
    const index = state.eventos.findIndex(evento => evento.id === payload.id)
    state.eventos[index].nombre = payload.nombre
    state.eventos[index].titulo = payload.titulo
  },
  isDone (state, payload) {
    const index = state.eventos.findIndex(evento => evento.id === payload)
    state.eventos[index].isDone = true
  },
  setLoading (state, payload) {
    state.isLoading = payload
  }
}
export const actions = {
  async getEventos ({ commit }) {
    try {
      const res = await db.collection('eventos').get()
      const eventos = []
      res.forEach((el) => {
        const evento = el.data()
        evento.id = el.id
        eventos.push(evento)
      })
      return commit('setEventos', eventos)
    } catch (err) {
      console.log(err)
    }
  },

  async addEvento ({ commit }, payload) {
    commit('setLoading', true)
    try {
      const res = await db.collection('eventos').add({
        creadorPor: payload.nombre,
        titulo: payload.titulo,
        fechaCreacion: new Date(),
        isDone: false
      })

      const data = (await res.get()).data()
      commit('setEvento', { id: res.id, nombre: data.creadoPor, titulo: data.titulo, fechaCreacion: data.fechaCreacion, isDone: data.isDone })
    } catch (error) {
      console.log(error)
    } finally {
      commit('setLoading', false)
    }
  },

  async updateEvento ({ commit }, payload) {
    commit('setLoading', true)
    try {
      await db.collection('eventos').doc(payload.id).update({
        creadorPor: payload.nombre,
        titulo: payload.titulo,
        fechaCreacion: payload.fechaCreacion,
        isDone: payload.isDone
      })
      commit('updateEvento', payload)
    } catch (error) {
      console.log(error)
    } finally {
      commit('setLoading', false)
    }
  },

  async madeEvent ({ commit }, payload) {
    commit('setLoading', true)
    try {
      await db.collection('eventos').doc(payload).update({
        isDone: true
      })
      commit('isDone', payload)
    } catch (error) {
      console.log(error)
    } finally {
      commit('setLoading', false)
    }
  },

  changeLoading ({ commit }, payload) {
    commit('setLoading', payload)
  }
}
