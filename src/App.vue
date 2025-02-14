<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <p>count is {{ count }}</p>
    <p>double of it is {{ double }}</p>
    <button @click="increment()">inc</button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import HelloWorld from './components/HelloWorld.vue'
import { useCounterStore } from './store';
import { collection, getDocs } from "firebase/firestore";
import { db } from '@/firebaseConfig.js';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  computed : {
    ...mapState(useCounterStore, ['count','double'])
  },
  methods : {
    ...mapActions(useCounterStore, ['increment'])
  },
  created(){
    getDocs(collection(db, "tasks")).then(querySnapshot=>{
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
      }).catch(err=>{
        console.log(err)
      })
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
