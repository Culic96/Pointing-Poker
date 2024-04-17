// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8EHyXcgGdfRR4fNzgm5e9XrKPYgp0-Uc",
  authDomain: "gc-pointing-poker.firebaseapp.com",
  projectId: "gc-pointing-poker",
  storageBucket: "gc-pointing-poker.appspot.com",
  messagingSenderId: "188930827407",
  appId: "1:188930827407:web:0652424290439c738efcfa",
  measurementId: "G-QKSB9P6674"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);