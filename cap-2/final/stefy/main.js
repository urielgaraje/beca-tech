import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import './common.js';
import { loginForm, closeForm, loanForm, transferForm } from './variables.js';
import { loginHandler } from './controller/loginController.js';
import {
  loanHandler,
  transferHandler,
  closeHandler,
} from './controller/formController.js';

loginForm.addEventListener('submit', loginHandler);

loanForm.addEventListener('submit', loanHandler);
transferForm.addEventListener('submit', transferHandler);
closeForm.addEventListener('submit', closeHandler);

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg7SRROkSKs4YGG69Sk2Xrmbk61xqZkL4",
  authDomain: "easy-bank-11106.firebaseapp.com",
  projectId: "easy-bank-11106",
  storageBucket: "easy-bank-11106.appspot.com",
  messagingSenderId: "1063275927997",
  appId: "1:1063275927997:web:0f127ee871fabd10515ad4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'movements');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}
getCities(db)
.then(data=>{
    console.log(data);
})
