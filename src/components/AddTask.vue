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
                small
                color="green"
                outlined
              >Client1</v-chip>
              <v-chip
                small
                color="green"
                outlined
              >Client2</v-chip>
              <v-chip
                small
                color="green"
                outlined
              >Client3</v-chip>
            </v-chip-group>
          </div>
          <div style="padding-top: 10px;"></div>
          <small >Select Milestone</small>
          <v-chip-group>
            <v-chip
              small
              outlined
              color="green"
            >MVP</v-chip>
            <v-chip
              small
              color="green"
              outlined
            >SEO Management</v-chip>
            <v-chip
              small
              color="green"
              outlined
            >19 Aug</v-chip>
          </v-chip-group>
          <div style="padding-top: 10px;"></div>
          <small>Select Dev</small>
          <v-chip-group>
            <v-chip
              small
              color="green"
              outlined
            >JS</v-chip>
            <v-chip
              small
              color="green"
              outlined
            >BB</v-chip>
            <v-chip
              small
              color="green"
              outlined
            >BM</v-chip>
            <v-chip
              color="green"
              outlined
            >RS</v-chip>
          </v-chip-group>
          <div style="display: flex;">
            <v-btn icon style="margin-top: 15px;">
              <v-icon>mdi-clock-time-four</v-icon>
            </v-btn>
            <v-text-field
              label="Task Name"
            ></v-text-field>
          </div>
          <div style="display: flex;">
            <v-btn icon style="margin-top: 15px;">
              <v-icon>mdi-message</v-icon>
            </v-btn>
            <v-text-field
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
            >Add Task</v-btn>
          </div>
        </v-card>
      </v-overlay>
    </v-row>
</template>

<script>
export default {
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