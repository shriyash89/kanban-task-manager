<template>
    <div>
        <v-tabs color="success" class="primary">
            <v-tab color="primary">
                Item One
            </v-tab>
            <v-tab color="primary">
                Item Two
            </v-tab>  
        </v-tabs>

        <!-- <v-container style="padding: 0;margin-top: 5px;">
            <div class="mt-2">
                <v-btn icon>
                    <v-icon color="green darken-1">mdi-plus</v-icon>
                </v-btn>
                <input class="subtask-input" type="text" placeholder="add subtask" >
            </div>
            <div>
                <v-radio-group style="margin: 0;">
                    <v-radio
                        label="red"
                        color="red"
                        value="red"
                    ></v-radio>
                    <v-radio
                        label="red darken-3"
                        color="red darken-3"
                        value="red darken-3"
                    ></v-radio>
                </v-radio-group>
            </div>
        </v-container> -->
        <v-container style="padding: 0;margin-top: 5px;">
            <div style="margin: 0;padding: 0;">
                <div class="options-div">
                    <v-checkbox
                        color="primary"
                        value="red"
                    ></v-checkbox>
                    <v-btn icon style="margin-top: 12px;margin-left: 5px;">
                        <v-icon color="green light-3">mdi-check</v-icon>
                    </v-btn>
                    <v-radio
                        color="red"
                        value="red"
                    ></v-radio>
                    <v-btn icon style="margin-top: 12px;margin-left: 5px;">
                        <v-icon color="red">mdi-delete</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon style="margin-top: 12px;margin-left: 5px;">
                        <v-icon color="green light-3">mdi-close-circle-outline</v-icon>
                    </v-btn>
                </div>
            </div>
            <v-radio-group style="margin: 0;">
                <v-checkbox
                    label="red"
                    color="red"
                    value="red"
                ></v-checkbox>
                <v-checkbox
                    label="red darken-3"
                    color="red darken-3"
                    value="red darken-3"
                ></v-checkbox>
            </v-radio-group>
        </v-container>
        <v-container>
           Task description
        </v-container>
    </div>
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