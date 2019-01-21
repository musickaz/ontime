<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate class="primary--text" :width="7" size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <h6><br></h6>
          <v-img contain height="100px" :src="meetup.imageUrl"></v-img>
          <v-card-title primary-title>
            <h2 class="primary--text">{{ meetup.title }}</h2>
            <v-spacer></v-spacer>
          <div class="info--text">{{ meetup.date | dateFilter}} - {{ meetup.location }}</div>
          <v-spacer></v-spacer>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
            </template>
          </v-card-title>
          <!-- <v-card-media :src="meetup.imageUrl" height="150px"></v-card-media> -->
          <v-spacer></v-spacer>
            <div>{{meetup.description}}</div>
          <v-card-text>
            <div>
              <app-edit-meetup-date-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-date-dialog>
              <app-edit-meetup-time-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-time-dialog>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-meetup-registration-dialog
              :meetupId="meetup.id"
              v-if="userIsAuthenticated && !userIsCreator"
            ></app-meetup-registration-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>