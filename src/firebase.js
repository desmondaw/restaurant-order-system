import firebase from 'firebase'




  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBMa9FU4SMMYl1-CtIUR6gh7HVUMcKFQfE",
    authDomain: "bt3103-week-6-fbab5.firebaseapp.com",
    projectId: "bt3103-week-6-fbab5",
    storageBucket: "bt3103-week-6-fbab5.appspot.com",
    messagingSenderId: "570410550674",
    appId: "1:570410550674:web:8c355ea71e6e5707aeed4b",
    measurementId: "G-KHHJFCQV7X"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var database = firebase.firestore();
export default database;