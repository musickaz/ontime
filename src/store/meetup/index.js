import * as firebase from 'firebase'

export default {
  state: {
    loadedMeetups: [],
    loadedMeetupsFromFirebase: []
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload)
    },
    setLoadMeetups(state, payload) {
      state.loadedMeetups = payload
    },
    updateMeetup(state, payload) {
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
    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
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
    loadMeetupsFromFirebase({ commit }) {
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
    updateMeetupData({ commit }, payload) {
      commit('setLoading', true)
      const editedMeetup = {}
      if (payload.title) {
        editedMeetup.title = payload.title
      }
      if (payload.description) {
        editedMeetup.description = payload.description
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
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    partLoadedMeetup(state, getters) {
      return getters.loadedMeetups.slice(0, 4)
    },
    loadedMeetup(state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
  }
}