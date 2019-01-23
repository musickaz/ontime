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
          <v-img v-if="!registeredOrCreator" contain height="100px" :src="meetup.imageUrl"></v-img>
          <v-card-title primary-title>
            <h2 class="primary--text">{{ meetup.title }}</h2>
            <v-spacer></v-spacer>
          <div class="info--text" v-if="!registeredOrCreator">{{ meetup.date | dateFilter}} - {{ meetup.location }}</div>
          </v-card-title>
          <app-timeline-dialog :meetup="meetup" v-if="registeredOrCreator"></app-timeline-dialog>
          <app-chat-dialog :meetup="meetup" v-if="registeredOrCreator"></app-chat-dialog>
          <v-spacer></v-spacer>
            <div v-if="!registeredOrCreator" >{{meetup.description}}</div>
          <v-card-text>
            <div>
              <app-edit-meetup-details-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-details-dialog>

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
    },
    userIsRegistered () {
      return this.$store.getters.user.registeredMeetups.findIndex((meetupId) => {
        return meetupId === this.id
      }) >= 0
    },
    registeredOrCreator () {
      return this.userIsRegistered || this.userIsCreator;
    }
  }
};
</script>
