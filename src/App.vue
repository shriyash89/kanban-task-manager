<template>
  <v-app style="background-color: #F8F8F8;">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <router-view/>
  </v-app>
</template>

<script>
import { mapActions } from 'pinia';
import { useTaskStore } from './store/taskStore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

  export default {
      methods : {
          ...mapActions(useTaskStore,['setLoggedUser'])
      },
      created(){
          const auth = getAuth()
          onAuthStateChanged(auth,user=>{
              this.setLoggedUser(user)
          })
      }
  }
</script>

<style scoped>
</style>
