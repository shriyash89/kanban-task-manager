<template>
    <v-form
      ref="form"
      lazy-validation
    >
      <v-text-field
        v-model="email"
        label="email"
        required
      ></v-text-field>
  
      <v-text-field
        v-model="password"
        label="password"
        type="password"
        required
      ></v-text-field>

      <div class="red--text">{{ error }}</div>
      <p 
            @click="$router.push('/register')" 
            style="text-decoration: underline;cursor: pointer;"
        >don't have an account?</p>
      <v-btn
        color="success"
        class="mr-4"
        @click="handleSubmit"
      >
        login
      </v-btn>
    </v-form>
</template>

<script>
import { useTaskStore } from '@/store/taskStore';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { mapActions } from 'pinia';
export default {
 data() {
    return {
      email : '',
      password : '',
      error : '',
    };
  },
  methods: {
    ...mapActions(useTaskStore, ['setLoggedUser']),
    handleSubmit() {
        this.email = this.email.trim()
        this.password = this.password.trim()
        if(!this.email || !this.password){
            alert('enter both the feilds')
            return null
        }
        
        const auth = getAuth()
        signInWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredentials)=>{
                this.error = ''
                this.setLoggedUser(userCredentials.user)
                // this.$router.push('/')
            })
            .catch(err=>{
                console.log("err",err)
                this.error = "invalid credentials"
            })
    }
  }
};
</script>

<style scoped>

</style>
