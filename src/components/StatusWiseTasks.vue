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
              <v-list-item 
                v-for="task in pendingTasks" 
                :key="task.id" 
                class="pa-0 pb-3"
                draggable
                @dragstart="startDrag($event,task.id, task.status)"
              >
                  <TaskItem v-bind:id="task.id" v-bind:idToDrop="idToDrop" v-on:nullifyIdToDrop="nullifyIdToDrop" />
              </v-list-item>
            </v-list>
            
          </v-card>
        </v-col>
        <v-col
          cols="12"
          sm="4"
          style="border-right: 2px solid #E8E8E8;"
          class="pa-3"
          @drop="onDrop($event,'process')"
          @dragover.prevent
          @dragenter.prevent
        >
        <!-- @drop="onDrop($event, 1)" -->
          <v-card
            elevation="0"
            color="transparent"
          >
            <b>In Progress</b> <small class="grey--text">({{ inProcessTasks.length }})</small>
            <v-list color="transparent">
              <v-list-item 
                v-for="task in inProcessTasks" 
                :key="task.id" 
                class="pl-0 pb-3"
                draggable
                @dragstart="startDrag($event,task.id,task.status)"
                >
                  <TaskItem v-bind:id="task.id" v-bind:idToDrop="idToDrop" v-on:nullifyIdToDrop="nullifyIdToDrop" />
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          sm="4"
          class="pa-3"
          @drop="onDrop($event,'done')"
          @dragover.prevent
          @dragenter.prevent
        >
          <v-card
            elevation="0"
            color="transparent"
          >
            <b>Done</b> <small class="grey--text">({{ doneTasks.length }})</small>
            <v-list color="transparent">
              <v-list-item 
                v-for="task in doneTasks" 
                :key="task.id" 
                class="pl-0 pb-3"
                draggable
                @dragstart="startDrag($event,task.id,task.status)"
              >
                  <TaskItem v-bind:id="task.id" v-bind:idToDrop="idToDrop" v-on:nullifyIdToDrop="nullifyIdToDrop" />
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
          idToDrop : null
        };
    },
    computed :{
      ...mapState(useTaskStore, ['pendingTasks','inProcessTasks','doneTasks'])
    },
    methods: {
        ...mapActions(useTaskStore, ['fetchTasks']),
        startDrag(evt,taskId,currentStatus) {
          evt.dataTransfer.dropEffect = 'move'
          evt.dataTransfer.effectAllowed = 'move'
          evt.dataTransfer.setData('itemID', taskId)
          evt.dataTransfer.setData('status', currentStatus)
        },
        onDrop(evt,statusTOChange) {
          const itemID = evt.dataTransfer.getData('itemID')
          const currentStatus = evt.dataTransfer.getData('status')
          if(statusTOChange!==currentStatus && !(statusTOChange==='done'&&currentStatus==='pending'))
              this.idToDrop = itemID
          
          // console.log("itemid"+itemID,"statusTOChange"+statusTOChange)
          
          // const item = this.items.find((item) => item.id == itemID)
          // console.log("idToDrop", this.idToDrop)
          // item.list = list
        },
        nullifyIdToDrop(){
          this.idToDrop = null
        },
    },
    created(){
        this.fetchTasks()
    }
};
</script>

<style scoped>
</style>