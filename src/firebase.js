import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBQ0N_UDj8UR_1IHHjyRghzHnHbL6bvUuU",
  authDomain: "fipugram-fec9c.firebaseapp.com",
  projectId: "fipugram-fec9c",
  storageBucket: "fipugram-fec9c.appspot.com",
  messagingSenderId: "819003314032",
  appId: "1:819003314032:web:8b146bdd6daea2eb0d49b5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

export { firebase, db };
