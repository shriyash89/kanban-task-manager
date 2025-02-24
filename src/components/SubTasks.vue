<template>
    <div>
        <v-tabs centered color="primary" class="primary">
            <v-tab @click="showInfo=false" style="width: 100%;">
                Sub Tasks
            </v-tab>
            <v-tab @click="showInfo=true" style="width: 100%;">
                INFO
            </v-tab>  
        </v-tabs>

        <div v-show="!showInfo">
            <v-container style="padding: 0;margin-top: 15px;" v-show="!showUpdate">
                <div class="mt-2">
                    <v-btn icon>
                        <v-icon color="darken-1" @click="handleNewSubtask">mdi-plus</v-icon>
                    </v-btn>
                    <input 
                        class="subtask-input" 
                        type="text" 
                        placeholder="add subtask" 
                        v-model="newSubtask"
                        @keyup.enter="handleNewSubtask"
                    >
                </div>
                <div>
                    <v-list>
                        <v-list-item 
                            v-for="(t,index) in subTask" 
                            :key="index" 
                            @click="t.check=true;showUpdate = true;selectedIndices.push(index);"
                            class="pl-0">
                            <v-radio
                                v-if="!t.done"
                                color="red"
                                value="red"
                            ></v-radio>
                            <v-icon small v-if="t.done" color="green light-3">mdi-check</v-icon>
                            <span v-if="t.done" class="green--text pl-2" style="text-decoration: line-through;">{{ t.subT }}</span>
                            <span v-if="!t.done">{{ t.subT }}</span>
                        </v-list-item>
                    </v-list>
                </div>
            </v-container>

            <v-container style="padding: 0;margin-top: 5px;" v-show="showUpdate">
                <div style="margin: 0;padding: 0;">
                    <div class="options-div">
                        <v-checkbox
                            color="primary"
                            v-model="allCheck"
                            @change="hanldeAllCheck"
                        ></v-checkbox>
                        <v-btn icon @click="handleDone" style="margin-top: 12px;margin-left: 5px;">
                            <v-icon color="green light-3">mdi-check</v-icon>
                        </v-btn>
                        <v-radio
                            color="red"
                            value="red"
                        ></v-radio>
                        <v-btn icon @click="handleDelete" style="margin-top: 12px;margin-left: 5px;">
                            <v-icon color="red">mdi-delete</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="handleCross();showUpdate=false" style="margin-top: 12px;margin-left: 5px;">
                            <v-icon color="grey light-2">mdi-close-circle-outline</v-icon>
                        </v-btn>
                    </div>
                </div>
                <v-list>
                    <v-list-item 
                        v-for="(t,index) in subTask" 
                        :key="index" 
                        @click="handleCheck(index)"
                        class="pl-0 h-50">
                        <v-checkbox
                            v-model=t.check
                            color="purple"
                        ></v-checkbox>
                        {{ t.subT }}
                    </v-list-item>
                </v-list>
            </v-container>
        </div>

        <v-container v-show="showInfo" class="pb-0 mb-0">
           {{ info }}
        </v-container>
    </div>
</template>

<script>
import { useTaskStore } from '@/store/taskStore';
import { mapActions } from 'pinia';

export default {
  props : {
    id : {
        required : true
    },
    subTa : {
        required : true
    },
    info : {
        required : true
    }
  },
  data() {
    return {
      subTask : this.subTa,
      newSubtask : '',
      selectedIndices : [],
      showInfo : false,
      showUpdate : false,
      allCheck : false
    };
  },
  methods: {
    ...mapActions(useTaskStore,['updateSubTasks']),
    handleNewSubtask(){
        this.newSubtask = this.newSubtask.trim()
        if(this.newSubtask){
            const newObj = {
                subT : this.newSubtask,
                done : false,
                check : false
            }
            this.subTask.push(newObj)
            this.updateSubTasks(this.id, this.subTask)
            this.newSubtask = ''
        }
    },
    handleCheck(index){
        this.showUpdate = true
        this.selectedIndices.push(index)
    },
    handleDone(){
        for (const t of this.subTask) {
            if(t.check===true){
                t.done = true
            } else
                t.done = false
        }
        this.updateSubTasks(this.id, this.subTask)
        this.showUpdate = false
    },
    handleDelete(){
        this.subTask = this.subTask.filter(t=>t.check===false)
        this.updateSubTasks(this.id, this.subTask)
        this.showUpdate = false
    },
    hanldeAllCheck(){
        this.subTask.forEach(t => {
            t.check = this.allCheck
        })
    },
    handleCross(){
        this.subTask.forEach(t => {
            t.check = false
        })
    }
  }
};
</script>

<style scoped>
.options-div{
    display: flex;
    flex-direction: row;
}
.subtask-input{
    border-bottom: 2px solid grey;
    margin-left: 3px;
}
.subtask-input:focus{
    outline: none;
}
</style>