import firebase from 'firebase/app';
import "firebase/database";
import "firebase/auth"


let firebaseConfig = {
  apiKey: "AIzaSyDg6ZCSEt1UnwKflAQjjPKZ5_ZTipaHcUM",
  authDomain: "projetooficina-c4eb8.firebaseapp.com",
  databaseURL: "https://projetooficina-c4eb8.firebaseio.com",
  projectId: "projetooficina-c4eb8",
  storageBucket: "projetooficina-c4eb8.appspot.com",
  messagingSenderId: "920717000841",
  appId: "1:920717000841:web:40caa96fc62dc59ffc4658",
  measurementId: "G-HNK5JL21LV"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;

// Conexão Firebase Principal***