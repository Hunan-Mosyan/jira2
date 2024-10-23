import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBH_NPpmI5PdW1YDohziXFznd56m31S-B4",
  authDomain: "jira-a9a98.firebaseapp.com",
  databaseURL: "https://jira-a9a98-default-rtdb.firebaseio.com",
  projectId: "jira-a9a98",
  storageBucket: "jira-a9a98.appspot.com",
  messagingSenderId: "96983586461",
  appId: "1:96983586461:web:3073e0b5cfda9fd7762674",
  measurementId: "G-4M3VYVTC7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export {
  db,
  auth
}


