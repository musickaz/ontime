<template>
<div id="app">
    <div>
      <v-img class="mt-3"
          contain
          height="200px"
          src="https://pbs.twimg.com/media/DHUQLupUQAAym6y.jpg"
      ></v-img>
    </div>
    <div>
        <h1>I'm Kazuo Saito, i build this app.</h1>
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
