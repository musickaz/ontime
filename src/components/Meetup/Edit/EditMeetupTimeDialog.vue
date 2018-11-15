<template>
    <v-dialog
        persistent
        max-width="350px"
        transition="dialog-transition"
        v-model="editDialog"
    >
    <v-btn accent slot="activator" class="info">
        Edite Time
    </v-btn>
    <v-card>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-title primary-title>
                        Edit Time
                    </v-card-title>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-time-picker
                        actions
                        format="24hr"
                        style="width: 100%"
                        v-model="editedTime">
                            <template slot-scope="{save, close}">
                                <v-btn flat class="blue--text darken-1" @click.native="editDialog = false">Close</v-btn>
                                <v-btn flat class="blue--text darken-1" @click.native="onSaveChanges">Save</v-btn>
                            </template>
                    </v-time-picker>
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
      editDialog: false,
      editedTime: null
    }
  },
  methods: {
    onSaveChanges () {
      const newDate = new Date(this.meetup.date)
      const hours = this.editedTime.match(/^(\d+)/)[1]
      const minutes = this.editedTime.match(/:(\d+)/)[1]

      newDate.setHours(hours)
      newDate.setMinutes(minutes)
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        date: newDate
      })

      this.editDialog = false
    }
  },
  created () {
    this.editedTime = new Date(this.meetup.date)
  }
}
</script>
