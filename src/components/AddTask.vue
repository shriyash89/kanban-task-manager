<template>
    <v-row justify="center">
      <v-overlay
      >
        <v-card
          light
          width="540px"
          elevation="2"
          style="padding:15px;"
        >
          <v-card-title style="padding: 0;margin: 0;margin-bottom: 7px;">Add Task</v-card-title>
          <div class="mt-4">
            <p class="mb-0 text-body-2">Select Client</p >
            <v-chip-group>
              <v-chip
                outlined
                @click="client='client1'"
                :color = "client==='client1' ? 'green' : ''"
              >
                <v-icon v-if="client==='client1'" class="pr-1 pl-0" small color="green light-3">mdi-check</v-icon>
                Client1
              </v-chip>
              <v-chip
                outlined
                @click="client='client2'"
                :color = "client==='client2' ? 'green' : ''"
              >
              <v-icon v-if="client==='client2'" class="pr-1 pl-0" small color="green light-3">mdi-check</v-icon>
              Client2</v-chip>
              <v-chip
                outlined
                @click="client='client3'"
                :color = "client==='client3' ? 'green' : ''"
              >
              <v-icon v-if="client==='client3'" class="pr-1 pl-0" small color="green light-3">mdi-check</v-icon>
              Client3</v-chip>
            </v-chip-group>
          </div>
          <div class="mb-0"></div>
          <p class="mb-0 text-body-2">Select Milestone</p >
          <v-chip-group>
            <v-chip
              outlined
              @click="mildstone='MVP'"
              :color = "mildstone==='MVP' ? 'green' : ''"
            >
            <v-icon v-if="mildstone==='MVP'" class="pr-1 pl-0" small color="green light-3">mdi-check</v-icon>
            MVP</v-chip>
            <v-chip
              outlined
              @click="mildstone='SEO Management'"
              :color = "mildstone==='SEO Management' ? 'green' : ''"
            >
            <v-icon v-if="mildstone==='SEO Management'" class="pr-1 pl-0" small color="green light-3">mdi-check</v-icon>
            SEO Management</v-chip>
            <v-chip
              outlined
              @click="mildstone='19 Aug'"
              :color = "mildstone==='19 Aug' ? 'green' : ''"
            >
            <v-icon v-if="mildstone==='19 Aug'" class="pr-1 pl-0" small color="green light-3">mdi-check</v-icon>
            19 Aug</v-chip>
          </v-chip-group>
          <p class="mb-0 text-body-2" >Select Dev</p >
          <v-chip-group>
            <v-chip
              outlined
              @click="dev='JS'"
              :color = "dev==='JS' ? 'green' : ''"
            >
            <v-icon v-if="dev==='JS'" class="pr-1 pl-0" small color="green light-3">mdi-check</v-icon>
            JS</v-chip>
            <v-chip
              outlined
              @click="dev='BB'"
              :color = "dev==='BB' ? 'green' : ''"
            >
            <v-icon v-if="dev==='BB'" class="pr-1 pl-0" small color="green light-3">mdi-check</v-icon>
            BB</v-chip>
            <v-chip
              outlined
              @click="dev='BM'"
              :color = "dev==='BM' ? 'green' : ''"
            >
            <v-icon v-if="dev==='BM'" class="pr-1 pl-0" small color="green light-3">mdi-check</v-icon>
            BM</v-chip>
            <v-chip
              outlined
              @click="dev='RS'"
              :color = "dev==='RS' ? 'green' : ''"
            >
            <v-icon v-if="dev==='RS'" class="pr-1 pl-0" small color="green light-3">mdi-check</v-icon>
            RS</v-chip>
          </v-chip-group>
          <div style="display: flex;">
            <v-btn icon style="margin-top: 15px;">
              <v-icon>mdi-clock-time-four</v-icon>
            </v-btn>
            <v-text-field
              color="grey"
              v-model="title"
              label="Task Name"
            ></v-text-field>
          </div>
          <div style="display: flex;">
            <v-btn icon style="margin-top: 15px;">
              <v-icon>mdi-message</v-icon>
            </v-btn>
            <v-text-field
              color="grey"
              v-model="desc"
              label="Description"
            ></v-text-field>
          </div>
          <div class="mt-5" style="display: flex;flex-direction: row-reverse;">
            <v-btn
              color="red"
              outlined
              small
              @click="$emit('invertShow')"
            >
              <v-icon small color="red light-3">mdi-window-close</v-icon>
              cancel
            </v-btn>
            <v-btn
              color="success"
              outlined
              small
              style="margin-right: 10px;"
              @click="handleSubmit"
            >
              <v-icon small color="green light-3">mdi-check</v-icon>
              Add Task
            </v-btn>
          </div>
        </v-card>
      </v-overlay>
    </v-row>
</template>

<script>
import { db } from '@/firebaseConfig';
import { useTaskStore } from '@/store/taskStore';
import { addDoc, collection } from 'firebase/firestore';
import { mapActions } from 'pinia';

export default {
    data() {
      return {
        title : '',
        desc : '',
        client : '',
        mildstone : '',
        dev : '',
      };
    },
    methods: {
      ...mapActions(useTaskStore, ['addNewTask']),
      handleSubmit(){
        this.title = this.title.trim()
        this.desc = this.desc.trim()
        if(!this.title || !this.desc || !this.client || !this.mildstone || !this.dev){
          alert('add all details!')
          return null
        }
        const newTask = {
          title : this.title,
          desc : this.desc,
          status : 'pending',
          client : this.client,
          mildstone : this.mildstone,
          dev : this.dev,
          subTasks : [],
          startAt : '',
          till : 0,
        }
        
        //add to firebase
        addDoc(collection(db,'tasks'), newTask)
          .then(docRef=>{
              this.addNewTask({id:docRef.id,...newTask})
              this.$emit('invertShow')
          })
          .catch(err=>{
              console.log(err)
          })
      }
    }
};
</script>

<style scoped>
</style>