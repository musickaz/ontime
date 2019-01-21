<template>
  <v-app dark>
    <v-navigation-drawer v-model="sideNav" temporary absolute>
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="onLogout" v-if="userIsAuth">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="dark">
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up" dark></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <router-link tag="span" style="cursor : pointer" to="/">
          <img src="./assets/logo.png" style="height:50px; margin-top: 7px; " alt="MGApp">
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn v-for="item in menuItems" :key="item.title" flat dark router :to="item.link">
          <!-- <v-icon dark left>{{ item.icon }}</v-icon> -->
          {{ item.title }}
        </v-btn>
        <v-btn v-if="userIsAuth" @click="onLogout" dark flat>
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "face", title: "Sign up", link: "/signup" },
        { icon: "lock_open", title: "Sign in", link: "/signin" },
        { icon: "info", title: "About", link: "/About" }
      ];
      if (this.userIsAuth) {
        menuItems = [
          { icon: "pageview", title: "View Events", link: "/meetups" },
          { icon: "room", title: "Create Event", link: "/meetup/new" },
          { icon: "person", title: "Profile", link: "/profile" },
          { icon: "info", title: "About", link: "/About" }
        ];
      }
      return menuItems;
    },
    userIsAuth() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>
