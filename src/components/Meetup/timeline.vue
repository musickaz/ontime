<template>
  <div id="visualization"></div>
</template>

<script>
//import TopLeftSearch from './TopLeftSearch.vue'
import vis from 'vis'
var container = {}
var items = {}
var options = {}
var timeline = {}

export default {
  name: 'app',
  mounted: function () {
  // DOM element where the Timeline will be attached
  container = document.getElementById('visualization');

  // Create a DataSet (allows two way data-binding)
  items = new vis.DataSet([
    {id: 1, content: 'GFC meeting item 3', start: '2019-01-21', title: 'で？'},
  ]);

  // Configuration for the Timeline
  options = {
    tooltip: {
      followMouse: true,
      overflowMethod: 'cap',
      editable: true,
      onDropObjectOnItem: true,
    }
  };
  options.editable = {
    add: true,         // add new items by double tapping
    updateTime: true,  // drag items horizontally
    updateGroup: true, // drag items from one group to another
    remove: true,       // delete an item by tapping the delete button top right
    overrideItems: false
  };

  // Create a Timeline
  timeline = new vis.Timeline(container, items, options);
  },
  components: {
    //TopLeftSearch
  }
}
</script>

<style>
@import "vue2vis/dist/vue2vis.css";
</style>
