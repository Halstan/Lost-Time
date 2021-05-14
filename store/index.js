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
  getEventos ({ commit }) {
    const ref = db.collection('eventos')
    ref.onSnapshot((querySnapshot) => {
      const eventos = []
      querySnapshot.forEach((doc) => {
        const evento = doc.data()
        evento.id = doc.id
        eventos.push(evento)
      })
      commit('setEventos', eventos)
    })
  },

  async addEvento ({ commit }, payload) {
    commit('setLoading', true)
    try {
      await db.collection('eventos').add({
        creadoPor: payload.nombre,
        titulo: payload.titulo,
        fechaCreacion: new Date(),
        isDone: false
      })
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
        creadoPor: payload.nombre,
        titulo: payload.titulo,
        fechaCreacion: payload.fechaCreacion,
        isDone: payload.isDone
      })
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
      // commit('isDone', payload)
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
