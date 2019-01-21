import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App";
import * as firebase from "firebase";
import router from "./router";
import "vuetify/dist/vuetify.min.css";
import { store } from "./store";
import DateFilter from "./filters/dateFilters";
import AlertCmp from "./components/Shared/Alert.vue";
// import colors from "vuetify/es5/util/colors";
import EditMeetupDetailsDialog from "./components/Meetup/Edit/EditMeetupDetailsDialog.vue";
import EditMeetupDateDialog from "./components/Meetup/Edit/EditMeetupDateDialog.vue";
import EditMeetupTimeDialog from "./components/Meetup/Edit/EditMeetupTimeDialog.vue";
import RegisterDialog from "./components/Meetup/Registration/RegistrationDialog.vue";



Vue.use(Vuetify, {
  theme: {
    // primary: colors.grey.accent4,
    // secondary: colors.grey.accent1,
    // accent: colors.grey.base,
    // error: colors.grey.base,
    // warning: colors.grey.base,
    // info: colors.grey.base,
    // success: colors.grey.base
  }
});

Vue.config.productionTip = false;

Vue.filter("dateFilter", DateFilter);
Vue.component("app-alert", AlertCmp);
Vue.component("app-edit-meetup-details-dialog", EditMeetupDetailsDialog);
Vue.component("app-edit-meetup-date-dialog", EditMeetupDateDialog);
Vue.component("app-edit-meetup-time-dialog", EditMeetupTimeDialog);
Vue.component("app-meetup-registration-dialog", RegisterDialog);
// Vue.component("timeline", vue2vis.Timeline);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyCNWmF6GcgKyY8NokAdH-dUpbe8I2GG7f0",
      authDomain: "airamp-ontime.firebaseapp.com",
      databaseURL: "https://airamp-ontime.firebaseio.com",
      projectId: "airamp-ontime",
      storageBucket: "airamp-ontime.appspot.com",
      messagingSenderId: "15549557227"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
        this.$store.dispatch("fetchUserData");
      }
    });
    this.$store.dispatch("loadMeetupsFromFirebase");
  }
});
