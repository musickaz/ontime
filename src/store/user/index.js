import * as firebase from 'firebase'

export default {
  state: {
    user: null,
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
    setUser (state, payload) {
      state.user = payload
    },
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
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
