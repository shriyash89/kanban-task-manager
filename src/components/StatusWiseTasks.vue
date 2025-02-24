<template>
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="4"
          style="height: 100vh;border-right: 2px solid #E8E8E8;"
          class="pa-3"
        >
          <v-card
            elevation="0"
            color="transparent"
          >
            <b>Pending</b> <small class="grey--text">({{ pendingTasks.length }})</small>
            <v-list color="transparent">
              <v-list-item v-for="task in pendingTasks" :key="task.id" class="pa-0 pb-3">
                  <TaskItem v-bind:id="task.id" />
              </v-list-item>
            </v-list>
            
          </v-card>
        </v-col>
        <v-col
          cols="12"
          sm="4"
          style="border-right: 2px solid #E8E8E8;"
          class="pa-3"
        >
          <v-card
            elevation="0"
            color="transparent"
          >
            <b>In Progress</b> <small class="grey--text">({{ inProcessTasks.length }})</small>
            <v-list color="transparent">
              <v-list-item v-for="task in inProcessTasks" :key="task.id" class="pl-0 pb-3">
                  <TaskItem v-bind:id="task.id" />
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          sm="4"
          class="pa-3"
        >
          <v-card
            elevation="0"
            color="transparent"
          >
            <b>Done</b> <small class="grey--text">({{ doneTasks.length }})</small>
            <v-list color="transparent">
              <v-list-item v-for="task in doneTasks" :key="task.id" class="pl-0 pb-3">
                  <TaskItem v-bind:id="task.id" />
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import TaskItem from './TaskItem.vue';
import { useTaskStore } from '@/store/taskStore';

export default {
    components : {
        TaskItem,
    },
    data() {
        return {
        
        };
    },
    computed :{
      ...mapState(useTaskStore, ['pendingTasks','inProcessTasks','doneTasks'])
    },
    methods: {
        ...mapActions(useTaskStore, ['fetchTasks'])
    },
    created(){
        this.fetchTasks()
    }
};
</script>

<style scoped>
</style>