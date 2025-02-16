<template>
    <v-expansion-panels focusable>
      <v-expansion-panel
      >
        <v-expansion-panel-header>
            <span>This is title of task</span>
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
                    Primary
                </v-chip>
                <span icon>
                    <v-icon right>mdi-checkbox-marked-outline</v-icon>
                    <span>0/3</span>
                </span>
            </div>
            <div>
                <v-btn icon>
                    <v-icon color="green darken-1">mdi-play</v-icon>
                </v-btn>

                <v-chip
                    class="ma-2"
                    color="green"
                    outlined
                >
                    dev
                </v-chip>
        
                <span icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </span>
            </div>
        </div>
        <v-expansion-panel-content>
            <SubTasks />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </template>

<script>
import SubTasks from './SubTasks.vue';

export default {
    name : "TaskItem",
    components : {
        SubTasks
    },
  data() {
    return {
      
    };
  },
  methods: {
    
  }
};
</script>

<style scoped>
.flex-items{
    display: flex;
    justify-content: space-between;
}
</style>