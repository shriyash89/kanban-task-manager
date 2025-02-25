import { defineStore } from "pinia";
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useTaskStore = defineStore('tasks' ,{
    state : () => ({ tasks : [], loggedUser : null}),
    getters : {
        pendingTasks(){
            return this.tasks.filter(t=>t.status==='pending')
        },
        inProcessTasks(){
            return this.tasks.filter(t=>t.status==='process')
        },
        doneTasks(){
            return this.tasks.filter(t=>t.status==='done')
        }
    },
    actions : {
        fetchTasks(){
            const auth = getAuth()
            // console.log("auth",auth)
            onAuthStateChanged(auth,user=>{
                if(user){
                    const qr = query(collection(db,"tasks"), where("uid","==",user.uid))
                    
                    getDocs(qr)
                        .then(snapshot=>{
                            this.tasks = []
                            snapshot.forEach(task=>{
                                this.tasks.push({id:task.id,...task.data()})
                            })
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                }
            })
            
        },
        addNewTask(newTask){
            this.tasks.push(newTask)
        },
        getTask(id){
            let arr = this.tasks.filter(t=>t.id===id)
            return arr[0]
        },
        async changeStatusInStore(id,status,till){

            for(let t of this.tasks) {
                if(t.id===id){
                    const docToUpdate = doc(db, 'tasks', id)
                    if(status==='process'){
                        const d = new Date()
                        t.startAt = d
                        t.status = status
                        await updateDoc(docToUpdate, {"status":status,"startAt":d})
                    }
                    else if(status==='done') {
                        t.till = till
                        t.status = status
                        t.startAt = ''
                        await updateDoc(docToUpdate, {"status":status,"till":till,"startAt":''})
                    }
                    // console.log(this.tasks)
                    break
                }
            }
        },
        async updateSubTasks(id,subtask){
            const docToUpdate = doc(db, 'tasks', id)
            await updateDoc(docToUpdate, {"subTasks" : subtask})
            for(let i=0;i<this.tasks;i++){
                if(this.tasks[i].id===id)
                    this.tasks[i].subTasks = subtask
            } 
        },
        setLoggedUser(user){
            // console.log("setLoggedUser",user.uid)
            this.loggedUser = user
        }
    }
})