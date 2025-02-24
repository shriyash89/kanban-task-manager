<template>
    <v-expansion-panels focusable>
      <v-expansion-panel
      >
        <v-expansion-panel-header class="pa-3">
            <span>{{ t.title }}</span>
        </v-expansion-panel-header>

        <div class="pl-2">
            <p>duration : <b>{{ hours }} :: {{ minutes }} :: {{ seconds }}</b></p>
        </div>
     
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
                    <v-icon color="green darken-1">mdi-{{ t.status!=='process' && 'play' }}</v-icon>
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
        <v-expansion-panel-content class="pa-2">
            <SubTasks :id="t.id" :subTa="t.subTasks" :info="t.desc" class="pa-0" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </template>

<script>
import { mapActions, mapState } from 'pinia';
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
            time:0,
            t : {},
            vel : 0,
            hours : 0,
            minutes : 0,
            seconds : 0,
            myInterval : '',
        };
    },
    computed : {
        ...mapState(useTaskStore,['tasks']),
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
        ...mapActions(useTaskStore,['getTask','changeStatusInStore']),
        updateTime(){
            const interal = setInterval(()=>{
                this.time += 1;

            },1000)

            console.log(interal);
        },
        changeStatus(){
            if(this.t.status==='pending') {
                this.changeStatusInStore(this.id,'process')
                this.vel = 0
                this.updateProcess()
            }
            else if(this.t.status==='process'){
                clearInterval(this.myInterval)
                this.changeStatusInStore(this.id,'done',this.vel)
                this.t = this.getTask(this.id)
            }
            else{
                this.changeStatusInStore(this.id,'process')
                this.vel = this.t.till
                this.convertTo()
                this.updateProcess()
            }
        },
        updateProcess(){
            this.myInterval = setInterval(()=>{
                this.vel += 1
                this.seconds += 1
                this.hours = Math.floor(this.vel/3600)
                this.minutes = Math.floor((this.vel-(this.hours*3600))/60)
                this.seconds = (this.vel-(this.hours*3600)-(this.minutes*60))
                if(this.seconds===60){
                    this.minutes += 1
                    this.seconds = 0
                }
                if(this.minutes===60){
                    this.hours += 1
                    this.minutes = 0
                }
            }, 1000)
        },
        convertTo(){
            this.hours = Math.floor(this.vel/3600)
            this.minutes = Math.floor((this.vel-(this.hours*3600))/60)
            this.seconds = (this.vel-(this.hours*3600)-(this.minutes*60))
        }
    },
    async created(){
        this.t = this.getTask(this.id)
        // console.log("inside the created")
        // console.log("task",this.t.startAt.__ob__)
        
        if(this.t.till!==0){
            this.vel = this.t.till
            if(this.t.startAt){
                const d = new Date()
                let dateToSet = this.t.startAt
                if(this.t.startAt.__ob__)
                    dateToSet = this.t.startAt.toDate()
                this.vel += Math.floor((d - dateToSet)/1000)
            }
            
            this.convertTo()
            if(this.t.status==='process'){
                this.updateProcess()
            }
        }
        else if(this.t.startAt) {
            const d = new Date()
            let dateToSet = this.t.startAt
            if(this.t.startAt.__ob__)
                dateToSet = this.t.startAt.toDate()

            this.vel = Math.floor((d - dateToSet)/1000)
            this.convertTo()
            this.updateProcess()
        } 
        
        this.t = this.getTask(this.id)
    },
    watch:{
        // vel(){
        //     console.log("here ",this.seconds);
        //     this.seconds += 1
        //     if(this.seconds===60){
        //         this.minutes += 1
        //         this.seconds = 0
        //     }
        //     if(this.minutes===60){
        //         this.hours += 1
        //         this.minutes = 0
        //     }
           
        // }
    }
};
</script>

<style scoped>
.flex-items{
    display: flex;
    justify-content: space-between;
}
</style>