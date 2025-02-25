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
        @click="$router.push('/login')" 
        style="text-decoration: underline;cursor: pointer;"
    >already registered?</p>
    <v-btn
      color="success"
      class="mr-4"
      @click="handleSubmit"
    >
      register
    </v-btn>
  </v-form>
</template>

<script>
import {createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
export default {
data() {
  return {
    email : '',
    password : '',
    error : '',
  };
},
methods: {
  handleSubmit() {
      this.email = this.email.trim()
      this.password = this.password.trim()
      if(!this.email || !this.password){
          alert('enter both the feilds')
          return null
      }
      
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredentials)=>{
              console.log(userCredentials.user)
              this.error = ''
              alert('registraton successful!')
              this.$router.push('/login')
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
