//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFireStore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwEUhIbw8LudSSobuNiPaUY8cjZq7l5jY",
    authDomain: "todo-database-5d941.firebaseapp.com",
    projectId: "todo-database-5d941",
    storageBucket: "todo-database-5d941.appspot.com",
    messagingSenderId: "134733315814",
    appId: "1:134733315814:web:61c11d65123cd355930527"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFireStore(app);

export {db};
export default app;
  

