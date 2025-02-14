<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <AppNavbar />
    </v-app-bar>

    <v-main>
      <p>count is {{ count }}</p>
      <p>double is {{ double }}</p>
      <v-btn @click="increment()">inc</v-btn>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import AppNavbar from './components/AppNavbar.vue';
import { useCounterStore } from './store';
import { db } from './firebaseConfig';
import { collection, getDocs } from "firebase/firestore";

export default {
  name: 'App',

  components: {
    AppNavbar,
  },

  data: () => ({
    
  }),
  computed : {
    ...mapState(useCounterStore, ['count','double'])
  },
  methods : {
    ...mapActions(useCounterStore, ['increment'])
  },
  created(){
    getDocs(collection(db,'tasks'))
      .then(snapshot=>{
        snapshot.forEach(doc => {
            console.log("docId-> "+doc.id, doc.data())
        });
      })
      .catch(err=>{
        console.log(err)
      })
  },
};
</script>
