<template>
    <v-dialog
        persistent
        v-model="registrationDialog"
        transition="dialog-transition"
    >
    <v-btn accent slot="activator" class="primary">
      {{ userIsRegistred ?  'Unregister' :  'Register' }}
    </v-btn>
    <v-card>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-title primary-title v-if="userIsRegistred">
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
                    <v-card-text v-if="userIsRegistred">
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
  props: ['meetup'],
  data () {
    return {
      registrationDialog: false,
      userIsRegistred: false
    }
  },
  methods: {
    onConfirm () {
      this.userIsRegistred ? this.userIsRegistred = false : this.userIsRegistred = true
      this.registrationDialog = false
    }
  }
}
</script>
