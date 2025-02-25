<template>
  <div>
    <AppNavbar />
    <StatusWiseTasks />
  </div>
</template>

<script>
import AppNavbar from '../components/AppNavbar.vue';
import StatusWiseTasks from '../components/StatusWiseTasks.vue';

export default {
  name: 'HomeView',
  components: {
    AppNavbar,
    StatusWiseTasks,
  },
}
</script>
