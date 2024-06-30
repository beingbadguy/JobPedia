import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCAJ3D_HxMVgga-36L4g-_wUG5CvsEvTBw',
  authDomain: 'job-portal-fe86e.firebaseapp.com',
  projectId: 'job-portal-fe86e',
  storageBucket: 'job-portal-fe86e.appspot.com',
  messagingSenderId: '34069794093',
  appId: '1:34069794093:web:81466fae0eac8dc58a57a4',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
