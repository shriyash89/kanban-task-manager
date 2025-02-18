<template>
    <v-expansion-panels focusable>
      <v-expansion-panel
      >
        <v-expansion-panel-header>
            <span>{{ t.title }}</span>
        </v-expansion-panel-header>
    
        <div class="flex-items">
            <div>
                <v-chip
                    class="ma-2"
                    color="primary"
                >
                    <span icon>
                        <v-icon>mdi-account</v-icon>
                    </span>
                    {{ t.client }}
                </v-chip>
                <span icon>
                    <v-icon right>mdi-checkbox-marked-outline</v-icon>
                    <span>{{completedSubtasks}}/{{ getlength }}</span>
                </span>
            </div>
            <div>
                <v-btn icon @click="changeStatus">
                    <v-icon color="green darken-1">mdi-{{ t.status==='pending' && 'play' }}</v-icon>
                    <v-icon small color="red darken-1">mdi-{{ t.status==='process' && 'square' }}</v-icon>
                </v-btn>

                <v-chip
                    class="ma-2"
                    color="green"
                    outlined
                >
                {{ t.dev }}
                </v-chip>
        
                <span icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </span>
            </div>
        </div>
        <v-expansion-panel-content>
            <SubTasks :id="t.id" :subTa="t.subTasks" :info="t.desc" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </template>

<script>
import { mapActions } from 'pinia';
import SubTasks from './SubTasks.vue';
import { useTaskStore } from '@/store/taskStore';

export default {
    props : {
        id : {
            required: true
        }
    },
    components : {
        SubTasks
    },
    data() {
        return {
            t : {}
        };
    },
    computed : {
        completedSubtasks(){
            let cnt = this.t.subTasks.reduce((total,t)=>{
                return total + t.done ? 1 : 0
            },0)
            return cnt
        },
        getlength(){
            return this.t.subTasks.length
        }
    },
    methods: {
        ...mapActions(useTaskStore,['task','changeStatusInStore']),
        changeStatus(){
            if(this.t.status==='pending')
                this.changeStatusInStore(this.id,'process')
            else
                this.changeStatusInStore(this.id,'done')
        }
    },
    created(){
       this.t = this.task(this.id)
    },
};
</script>

<style scoped>
.flex-items{
    display: flex;
    justify-content: space-between;
}
</style>