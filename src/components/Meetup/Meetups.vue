<template>
    <v-container>
        <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="mb-2">
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                <v-card class="dark">
                    <v-container fluid>
                        <v-layout row>
                            <v-flex xs5 sm4 md3>
                                <v-img
                                contain
                                height="130px"
                                :src="meetup.imageUrl"
                            ></v-img>
                            </v-flex>
                            <v-flex xs7 sm8 md9>
                                <v-card-title primary-title>
                                    <div>
                                        <h3 class="white--text mb-0">{{ meetup.title }}</h3>
                                        <div>{{ meetup.date | dateFilter }}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn flat :to="'/meetup/' + meetup.id">
                                        <v-icon left light>arrow_forward</v-icon>
                                        View Event
                                    </v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>