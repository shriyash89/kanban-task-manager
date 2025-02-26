<template>
    <v-row justify="center">
      <v-overlay
        :z-index="7"
      >
        <v-card
          light
          width="540px"
          elevation="2"
          style="padding:15px;"
        >
          <v-card-title style="padding: 0;margin: 0;margin-bottom: 7px;">Choose Task</v-card-title>
          <v-row align="center">
            <v-col cols="12">
              <v-select
                :items="otherTasksTtitle"
                :menu-props="{ top: true, offsetY: true }"
                v-model="selecteText"
              ></v-select>
            </v-col>
          </v-row>

          <div class="mt-5" style="display: flex;flex-direction: row-reverse;">
            <v-btn
              color="red"
              outlined
              small
              @click="$emit('invertShow')"
            >
            <!-- <v-icon small color="red light-3">mdi-window-close</v-icon> -->
              cancel
            </v-btn>
            <v-btn
              color="success"
              outlined
              small
              style="margin-right: 10px;"
              @click="handleSave"
            >
            <!-- <v-icon small color="green light-3">mdi-check</v-icon> -->
              save
            </v-btn>
          </div>
        </v-card>
      </v-overlay>
    </v-row>
</template>

<script>
import { useTaskStore } from '@/store/taskStore';
import { mapState } from 'pinia';

export default {
    props:{
      id : {
        required : true
      }
    },
    data() {
      return {
        selecteText: '',
      };
    },
    computed:{
        ...mapState(useTaskStore,['loggedUser','tasks']),
        otherTasksTtitle(){
          let arr = []
          this.tasks.forEach(t=>{
            if(t.id!==this.id)
              arr.push(t.title)
          })
          return arr
        }
    },
    methods: {
        handleSave(){
          if(this.selecteText!=='') { 
            this.tasks.forEach(t=>{
              if(t.title===this.selecteText){
                  this.$emit('shiftSubtasks', t.id)
              }
            })
          }
        }
    },
};
</script>

<style scoped>
</style>