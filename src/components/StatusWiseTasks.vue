<template>
    <v-container fluid class="grey lighten-5">
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="4"
        >
          <v-card
            outlined
            tile
          >
            Pending <small>({{ pendingTasks.length }})</small>
            <v-list>
              <v-list-item v-for="task in pendingTasks" :key="task.id" class="pl-0 pb-3">
                  <TaskItem v-bind:id="task.id" />
              </v-list-item>
            </v-list>
            
          </v-card>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <v-card
            outlined
            tile
          >
            In progress <small>({{ inProcessTasks.length }})</small>
            <v-list>
              <v-list-item v-for="task in inProcessTasks" :key="task.id" class="pl-0 pb-3">
                  <TaskItem v-bind:id="task.id" />
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <v-card
            outlined
            tile
          >
            done <small>({{ doneTasks.length }})</small>
            <v-list>
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