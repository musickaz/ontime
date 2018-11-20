<template>
<div id="app">
    <div>
      <v-img class="mt-3"
          contain
          height="200px"
          src="https://media.licdn.com/dms/image/C4E03AQGEUnRF3FcdQA/profile-displayphoto-shrink_200_200/0?e=1548288000&v=beta&t=E8Jdnd5r2BqR-tOTuLYIw856THkggmAqWTaiT5R9XJg"
      ></v-img>
    </div>
    <div>
        <h1>I'm Mohamed Ghoubali, i build this app.</h1>
    </div>
    <div>
        <p>
        You can find the project repository of this app in my
        <a href="https://github.com/Foetus6907/mg-devmyapp-vue">GitHub repository</a>. This SPA is made with Firebase Hosting and Realtime Database, VueJs, Vuetify, and VueX for state management.
        You can follow me on LinkedIn and GitHub, where i regularly post about Firebase and VueJs.
        </p>
    </div>

    <div>
        <a href="https://www.linkedin.com/in/mohamed-ghoubali-9a698187/">
            <img id="linkedinImg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1280px-LinkedIn_Logo.svg.png">
        </a>
        <a href="https://github.com/Foetus6907">
            <img id="githubImg" src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png">
        </a>
    </div>
</div>

</template>

<script>
export default {}
</script>

<style scoped>
div {
  display: block;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: auto;
}
p {
  margin-right: 10%;
  margin-left: 10%;
}
a:link {
  color: green;
  background-color: transparent;
  text-decoration: none;
}
a:visited {
  color: pink;
  background-color: transparent;
  text-decoration: none;
}
a:hover {
  color: red;
  background-color: transparent;
  text-decoration: underline;
}
a:active {
  color: yellow;
  background-color: transparent;
  text-decoration: underline;
}
#githubImg {
  width: 15%;
  height: 15%;
}
#linkedinImg {
  width: 15%;
  height: 15%;
}
</style>
