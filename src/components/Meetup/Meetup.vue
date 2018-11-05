<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title primary-title>
                        <h2 class="primary--text">{{ meetup.title }}</h2>
                    </v-card-title>
                    <v-img
                        contain
                        height="100px"
                        :src="meetup.imageUrl"
                    ></v-img>
                    <v-card-text>
                        <div class="info--text">
                            {{ meetup.date | dateFilter}} - {{ meetup.location }}
                        </div>
                        <div>{{meetup.description}}</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    meetup () {
      return this.$store.getters.loadedMeetup(this.id)
    }
  }
}
</script>

