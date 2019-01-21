<template>
  <v-dialog persistent max-width="350px" transition="dialog-transition" v-model="editDialog">
    <v-btn accent slot="activator" class="info">Edite Date</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title primary-title>Edit Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker
              actions
              :reactive="true"
              locale="en-us"
              :first-day-of-week="1"
              style="width: 100%"
              v-model="editedDate"
            >
              <template slot-scope="{save, close}">
                <v-btn flat class="blue--text darken-1" @click.native="editDialog = false">Close</v-btn>
                <v-btn flat class="blue--text darken-1" @click.native="onSaveChanges">Save</v-btn>
              </template>
            </v-date-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      editDialog: false,
      editedDate: null
    };
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date);
      const newDay = new Date(this.editedDate).getUTCDate();
      const newMonth = new Date(this.editedDate).getUTCMonth();
      const newYear = new Date(this.editedDate).getUTCFullYear();
      newDate.setUTCDate(newDay);
      newDate.setUTCMonth(newMonth);
      newDate.setUTCFullYear(newYear);

      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: newDate
      });

      this.editDialog = false;
    }
  },
  created() {
    this.editedDate = new Date(this.meetup.date).toISOString().substr(0, 10);
  }
};
</script>
