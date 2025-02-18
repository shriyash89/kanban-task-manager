<template>
    <v-row justify="center">
      <v-overlay

      >
        <v-card
          light
          width="500px"
          elevation="2"
          style="padding:15px;"
        >
          <v-card-title style="padding: 0;margin: 0;margin-bottom: 7px;">Add Task</v-card-title>
          <div style="padding-top: 12px;">
            <small>Select Client</small>
            <v-chip-group>
              <v-chip
                outlined
                @click="client='client1'"
              >Client1</v-chip>
              <v-chip
                outlined
                @click="client='client2'"
              >Client2</v-chip>
              <v-chip
                outlined
                @click="client='client3'"
              >Client3</v-chip>
            </v-chip-group>
          </div>
          <div style="padding-top: 10px;"></div>
          <small >Select Milestone</small>
          <v-chip-group>
            <v-chip
              outlined
              @click="mildstone='MVP'"
            >MVP</v-chip>
            <v-chip
              outlined
              @click="mildstone='SEO Management'"
            >SEO Management</v-chip>
            <v-chip
              outlined
              @click="mildstone='19 Aug'"
            >19 Aug</v-chip>
          </v-chip-group>
          <div style="padding-top: 10px;"></div>
          <small>Select Dev</small>
          <v-chip-group>
            <v-chip
              outlined
              @click="dev='JS'"
            >JS</v-chip>
            <v-chip
              outlined
              @click="dev='BB'"
            >BB</v-chip>
            <v-chip
              outlined
              @click="dev='Bm'"
            >BM</v-chip>
            <v-chip
              outlined
              @click="dev='RS'"
            >RS</v-chip>
          </v-chip-group>
          <div style="display: flex;">
            <v-btn icon style="margin-top: 15px;">
              <v-icon>mdi-clock-time-four</v-icon>
            </v-btn>
            <v-text-field
              v-model="title"
              label="Task Name"
            ></v-text-field>
          </div>
          <div style="display: flex;">
            <v-btn icon style="margin-top: 15px;">
              <v-icon>mdi-message</v-icon>
            </v-btn>
            <v-text-field
              v-model="desc"
              label="Description"
            ></v-text-field>
          </div>
          <div style="display: flex;flex-direction: row-reverse;">
            <v-btn
              color="danger"
              outlined
              small
              @click="$emit('invertShow')"
            >
              cancel
            </v-btn>
            <v-btn
              color="success"
              outlined
              small
              style="margin-right: 10px;"
              @click="handleSubmit"
            >Add Task</v-btn>
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
          subTasks : []
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