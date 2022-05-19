import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAg7SRROkSKs4YGG69Sk2Xrmbk61xqZkL4',
  authDomain: 'easy-bank-11106.firebaseapp.com',
  projectId: 'easy-bank-11106',
  storageBucket: 'easy-bank-11106.appspot.com',
  messagingSenderId: '1063275927997',
  appId: '1:1063275927997:web:0f127ee871fabd10515ad4',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
