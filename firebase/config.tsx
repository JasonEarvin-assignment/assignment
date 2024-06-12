// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyDnTteJ6_O9NVwQBrQY6CzH_A0LJQ_oJ4I",
  authDomain: "assignment-ba844.firebaseapp.com",
  projectId: "assignment-ba844",
  storageBucket: "assignment-ba844.appspot.com",
  messagingSenderId: "819265369623",
  appId: "1:819265369623:web:f9d9917fc149669f83ce52",
  measurementId: "G-RKHE7LJ0W5"
};

const app = initializeApp(config);
const firestore = getFirestore(app);

export { firestore };