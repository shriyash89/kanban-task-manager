// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTRxoVGtkudZj5zprUuvm7rH_rFu_AiRI",
  authDomain: "kanban-task-management-59e73.firebaseapp.com",
  projectId: "kanban-task-management-59e73",
  storageBucket: "kanban-task-management-59e73.firebasestorage.app",
  messagingSenderId: "361129550094",
  appId: "1:361129550094:web:a73d143d3b8f377a31775f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)
