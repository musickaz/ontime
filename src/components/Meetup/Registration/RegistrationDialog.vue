<template>
    <v-dialog
        persistent
        v-model="registrationDialog"
        transition="dialog-transition"
    >
    <v-btn accent slot="activator" class="primary">
      {{ userIsRegistered ?  'Unregister' :  'Register' }}
    </v-btn>
    <v-card>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-title primary-title v-if="userIsRegistered">
                        Unregister from this Meetup
                    </v-card-title>
                    <v-card-title primary-title v-else>
                        Register to this Meetup
                    </v-card-title>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-text v-if="userIsRegistered">
                        Click confirm button to Unregister
                    </v-card-text>
                    <v-card-text v-else>
                        Click confirm button to Register
                    </v-card-text>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-actions>
                        <v-btn flat class="red--text darken-1" @click="registrationDialog = false">Cancel</v-btn>
                        <v-btn flat class="green--text darken-1" @click="onConfirm">Confirm</v-btn>
                    </v-card-actions>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ['meetupId'],
  data () {
    return {
      registrationDialog: false,
      userIsRegistred: false
    }
  },
  methods: {
    onConfirm () {
      if (this.userIsRegistered) {
        this.$store.dispatch('unregisterUserForMeetup', this.meetupId)
      } else {
        this.$store.dispatch('registerUserForMeetup', this.meetupId)
      }
      this.registrationDialog = false
    }
  },
  computed: {
    userIsRegistered () {
      return this.$store.getters.user.registeredMeetups.findIndex((meetupId) => {
        return meetupId === this.meetupId
      }) >= 0
    }
  }
}
</script>
