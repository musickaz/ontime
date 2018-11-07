import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/NYC_Montage_2014_4_-_Jleon.jpg',
        id: 'jhdfgsjhdgfdfs12321',
        title: 'Meetup in New York',
        date: new Date(),
        location: 'New York',
        description: 'New York New York !!'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Paris_-_Eiffelturm_und_Marsfeld2.jpg/560px-Paris_-_Eiffelturm_und_Marsfeld2.jpg',
        id: 'sfsfjbgsfjghg',
        title: 'Meetup in Paris',
        date: new Date(),
        location: 'Paris',
        description: 'Awsome Paris !'
      }
    ],
    user: null,
    loading: false,
    error: null,
    loadedMeetupsFromFirebase: []
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    setLoadMeetups (state, payload) {
      state.loadedMeetups = payload
    }
  },
  actions: {
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString()
      }
      // Reach out to firebase and then store it
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          console.log(data)
          const key = data.key
          commit('createMeetup', {
            ...meetup,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    signUserUp ({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    clearError ({commit}) {
      commit('clearError')
    },
    loadMeetupsFromFirebase ({commit}) {
      commit('setLoading', true)
      // get meetups from firebase
      firebase.database().ref('meetups').once('value')
        .then(
          (data) => {
            console.log(data)
            const meetups = []
            const obj = data.val()
            console.log(obj)
            for (var key in obj) {
              meetups.push(
                {
                  id: key,
                  title: obj[key].title,
                  location: obj[key].location,
                  imageUrl: obj[key].imageUrl,
                  description: obj[key].description,
                  date: obj[key].date
                }
              )
            }
            commit('setLoading', false)
            commit('setLoadMeetups', meetups)
          }
        )
        .catch(
          (error) => {
            commit('setLoading', false)
            console.log(error)
          }
        )
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    partLoadedMeetup (state, getters) {
      return getters.loadedMeetups.slice(0, 4)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    error (state) {
      return state.error
    },
    loading (state) {
      return state.loading
    }
  }
})
