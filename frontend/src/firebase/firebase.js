
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCrFIi7PCdl8bvNaMnyuthiqcY96I-Qikg",
    authDomain: "project2024tic.firebaseapp.com",
    projectId: "project2024tic",
    storageBucket: "project2024tic.appspot.com",
    messagingSenderId: "905148136435",
    appId: "1:905148136435:web:548b0ca6e3956d0fb7f086"
  };

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db = getFirestore(app);

export{auth, db}