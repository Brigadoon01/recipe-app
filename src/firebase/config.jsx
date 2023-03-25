import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAB-OSMmdQf0iVXP9flQwMkNdWS0Objkao",
    authDomain: "chef-cheffings.firebaseapp.com",
    projectId: "chef-cheffings",
    storageBucket: "chef-cheffings.appspot.com",
    messagingSenderId: "290107975844",
    appId: "1:290107975844:web:ac539c318644faf1795e31"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //Initialize services
  const projesctFirestore =  firebase.firestore()

  export { projesctFirestore }