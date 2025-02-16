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
            Pending(12)
            <TaskItem />
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
            In progress(10)
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
            done
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import TaskItem from './TaskItem.vue';

export default {
    components : {
        TaskItem,
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
</style>