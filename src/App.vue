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
