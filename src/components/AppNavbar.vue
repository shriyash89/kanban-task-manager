<template>
  <div>
    <v-card
      color="grey lighten-4"
      flat
      tile
    >
      <v-toolbar dense>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
  
        <v-toolbar-title>Task Manager</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-btn icon>
          <v-icon>mdi-refresh</v-icon>
        </v-btn>

        <v-btn icon @click="showAddTaskOverlay=true">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
  
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-filter</v-icon>
        </v-btn>
  
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <AddTask v-show="showAddTaskOverlay" @invertShow="showAddTaskOverlay=false" />
  </div>
</template>
  
<script>
import AddTask from './AddTask.vue';

  
  export default {
    name: 'AppNavbar',
    components: {
        AddTask,
    },
    data(){
      return {
        showAddTaskOverlay : false
      }
    },
    computed : {

    },
    methods : {

    },
  }
</script>
  
<style scoped>

</style>
  