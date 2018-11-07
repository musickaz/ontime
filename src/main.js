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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCa-fYr1vDhJQ1RvfeVFqcPEXbGSef2GME',
      authDomain: 'max-meetupdev.firebaseapp.com',
      databaseURL: 'https://max-meetupdev.firebaseio.com',
      projectId: 'max-meetupdev',
      storageBucket: 'max-meetupdev.appspot.com',
      messagingSenderId: '951577629864'
    })
    this.$store.dispatch('loadMeetupsFromFirebase')
  }
})
