/* eslint-disable no-console */
import { db } from '@/plugins/firebase'

export const state = () => ({
  eventos: [],
  evento: {}
})
export const mutations = {
  setEventos (state, payload) {
    state.eventos = payload
  },
  setEvento (state, payload) {
    state.eventos.push(payload)
  }
}
export const actions = {
  async nuxtServerInit ({ commit }, { req }) {
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
    try {
      const res = await db.collection('eventos').add({
        creadorPor: payload.nombre,
        titulo: payload.titulo,
        fechaCreacion: new Date()
      })
      const fecha = (await res.get()).data().fechaCreacion
      // console.log(await (await res.get()).data().fechaCreacion)
      commit('setEvento', { nombre: payload.nombre, titulo: payload.titulo, fechaCreacion: fecha })
    } catch (error) {
      console.log(error)
    }
  }
}
