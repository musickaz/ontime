<template>
    <v-dialog
        persistent
        v-model="editDialog"
        max-width="350px"
        transition="dialog-transition"
    >
    <v-btn fab accent slot="activator" class="info">
        <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-title primary-title>
                        Edit Meetup
                    </v-card-title>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-text>
                        <v-text-field
                        class="secondary--text"
                        name="title"
                        label="Tiltle"
                        id="title"
                        type="text"
                        v-model="editedTitle"
                        required
                        ></v-text-field>
                        <v-textarea
                        label="Description"
                        name="description"
                        id="description"
                        v-model="editedDescription"
                        type="text"
                        required
                        ></v-textarea>
                    </v-card-text>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-actions>
                        <v-btn flat class="blue--text darken-1" @click="editDialog = false">Close</v-btn>
                        <v-btn flat class="blue--text darken-1" @click="onSaveChanges">Save</v-btn>
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
      editDialog: false,
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description
    }
  },
  methods: {
    onSaveChanges () {
      if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
        return
      }
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription
      })
      this.editDialog = false
    }
  }
}
</script>
