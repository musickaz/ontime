<template>
    <v-container>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <h1 class="primary--text">Create a new Meetup</h1>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <form @submit.prevent="onCreateMeetup">
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-text-field
                  class="secondary--text"
                  name="title"
                  label="Tiltle"
                  id="title"
                  type="text"
                  v-model="title"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-text-field
                  name="location"
                  label="Location"
                  id="location"
                  type="text"
                  v-model="location"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-text-field
                  name="imageUrl"
                  label="Image URL"
                  id="image-url"
                  type="text"
                  v-model="imageUrl"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <img :src="imageUrl" alt="please enter a valide url" height="200px">
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-textarea
                  label="Description"
                  name="description"
                  id="description"
                  v-model="description"
                  type="text"
                  required
                ></v-textarea>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <h3>Choose Date and Time</h3>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3 class="mb-1">
                <v-date-picker
                  v-model="date"
                  :reactive="true"
                  locale="fr"
                  :first-day-of-week="1"
                ></v-date-picker>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-time-picker v-model="time" format="24hr"></v-time-picker>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-btn type="submit" color="success" :disabled="!formIsVallide">Validate</v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      imageUrl: '',
      location: '',
      date: new Date().toISOString().substr(0, 10),
      time: new Date()
    }
  },
  computed: {
    formIsVallide () {
      return this.title !== '' &&
              this.location !== '' &&
              this.description !== '' &&
              this.imageUrl !== ''
    },
    submittableDate () {
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        let hours = this.time.match(/^(\d+)/)[1]
        let minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      return date
    }
  },
  methods: {
    onCreateMeetup () {
      if (!this.formIsVallide) {
        return
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        description: this.description,
        imageUrl: this.imageUrl,
        date: this.submittableDate
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    }
  }
}
</script>

