import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import DateFilter from './filters/dateFilters'
import AlertCmp from './components/Shared/Alert.vue'
import colors from 'vuetify/es5/util/colors'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog.vue'
import RegisterDialog from './components/Meetup/Registration/RegistrationDialog.vue'

Vue.use(Vuetify, {
  theme: {
    primary: colors.blue.accent4,
    secondary: colors.blue.accent1,
    accent: colors.purple.base,
    error: colors.red.base,
    warning: colors.orange.base,
    info: colors.lightBlue.base,
    success: colors.green.base
  }
})

Vue.config.productionTip = false

Vue.filter('dateFilter', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog)
Vue.component('app-meetup-registration-dialog', RegisterDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDHDVRHnu1cBVFOT30eNwqNb7BgICFYums',
      authDomain: 'mg-meetupdev.firebaseapp.com',
      databaseURL: 'https://mg-meetupdev.firebaseio.com',
      projectId: 'mg-meetupdev',
      storageBucket: 'mg-meetupdev.appspot.com',
      messagingSenderId: '362998509734'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetupsFromFirebase')
  }
})
