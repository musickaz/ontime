import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [],
    user: null,
    loading: false,
    error: null,
    loadedMeetupsFromFirebase: []
  },
  mutations: {
    registerUserForMeetup (state, payload) {
      const id = payload.id
      if (state.user.registeredMeetups.findIndex((meetup) => meetup.id === id) >= 0) {
        // eslint-disable-next-line
        return
      }
      state.user.registeredMeetups.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserForMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
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
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find((element) => {
        return element.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
    }
  },
  actions: {
    registerUserForMeetup ({ commit, getters }, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/registrations/')
        .push(payload)
        .then((data) => {
          commit('setLoading', false)
          commit('registerUserForMeetup', {id: payload, fbKey: data.key})
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    unregisterUserForMeetup ({ commit, getters }, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
        .remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserForMeetup', payload)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id,
        imageUrl: payload.imageUrl
      }
      let imageUrl
      let key
      // Reach out to firebase and then store it
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key
          return key
        })
        .then((key) => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          firebase.storage().ref('meetups/' + key + ext).put(payload.image)
          .then(snapshot => {
            return snapshot.ref.getDownloadURL() // Will return a promise with the download link
          })
          .then(downloadURL => {
            imageUrl = downloadURL
            return firebase.database().ref('meetups/').child(key).update({ imageUrl: imageUrl })
          })
          .then(() => {
            commit('createMeetup', {
              ...meetup,
              imageUrl: imageUrl,
              id: key
            })
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
              registeredMeetups: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
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
              registeredMeetups: [],
              fbKeys: {}
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
    autoSignIn ({commit}, payload) {
      commit('setUser', { id: payload.uid, registeredMeetups: [], fbKeys: {} })
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
        .then((data) => {
          const dataObj = data.val()
          let registeredMeetups = []
          let swappedObj = {}
          for (const key in dataObj) {
            registeredMeetups.push(dataObj[key])
            swappedObj[dataObj[key]] = key
          }
          // console.log(registeredMeetups)
          // console.log(swappedObj)
          const updatedUser = {
            id: getters.user.id,
            registeredMeetups: registeredMeetups,
            fbKeys: swappedObj
          }
          commit('setLoading', false)
          commit('setUser', updatedUser)
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
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
            // console.log(data)
            const meetups = []
            const obj = data.val()
            // console.log(obj)
            for (var key in obj) {
              meetups.push(
                {
                  id: key,
                  title: obj[key].title,
                  location: obj[key].location,
                  imageUrl: obj[key].imageUrl,
                  description: obj[key].description,
                  date: obj[key].date,
                  creatorId: obj[key].creatorId
                }
              )
            }
            commit('setLoading', false)
            commit('setLoadMeetups', meetups)
          }
        )
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        }
        )
    },
    updateMeetupData ({ commit }, payload) {
      commit('setLoading', true)
      const editedMeetup = {}
      if (payload.title) {
        editedMeetup.title = payload.title
      }
      if (payload.description) {
        editedMeetup.description = payload.description
      }
      if (payload.location) {
        editedMeetup.location = payload.location
      }
      if (payload.date) {
        editedMeetup.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(editedMeetup)
      .then(() => {
        commit('setLoading', false)
        commit('updateMeetup', payload)
      })
      .catch((error) => {
        commit('setLoading', false)
        console.log(error)
      })
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
