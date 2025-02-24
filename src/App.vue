<template>
  <v-app style="background-color: #F8F8F8;">
    <AppNavbar />
    <StatusWiseTasks />
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import AppNavbar from './components/AppNavbar.vue';
import { useCounterStore } from './store';
import StatusWiseTasks from './components/StatusWiseTasks.vue';

export default {
  name: 'App',

  components: {
    AppNavbar,
    StatusWiseTasks,
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
    // getDocs(collection(db,'tasks'))
    //   .then(snapshot=>{
    //     snapshot.forEach(doc => {
    //         console.log("docId-> "+doc.id, doc.data())
    //     });
    //   })
    //   .catch(err=>{
    //     console.log(err)
    //   })
  },
};
</script>
