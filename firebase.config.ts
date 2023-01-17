// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDlw-rfS2V8pS9BGKWfxeS3fhZsu1UQs3I",
//   authDomain: "portfolio-01-project-cult.firebaseapp.com",
//   projectId: "portfolio-01-project-cult",
//   storageBucket: "portfolio-01-project-cult.appspot.com",
//   messagingSenderId: "407129336215",
//   appId: "1:407129336215:web:2e39735dfa0648f79ebcd2",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
