
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
  import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js'
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB3--87MNqCiKB_-uNj2ZT_DvFs_RbjetI",
    authDomain: "todo-97f26.firebaseapp.com",
    projectId: "todo-97f26",
    storageBucket: "todo-97f26.appspot.com",
    messagingSenderId: "819996387584",
    appId: "1:819996387584:web:100fe60b6c6444c127ebe5",
    measurementId: "G-XKM3J8KK2V"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
