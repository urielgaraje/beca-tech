import { db } from '../common/firebase.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Account } from '../models/Account';
import {
  labelWelcome,
  inputLoginUsername,
  inputLoginPin,
  containerApp,
} from '../common/variables.js';

import { updateUI } from '../controllers/viewController.js';

const loginHandler = async (event, cb) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formProps = Object.fromEntries(formData);

  const accountsRef = collection(db, 'accounts');
  const movementsRef = collection(db, 'movements');

  const accQuery = query(
    accountsRef,
    where('username', '==', formProps.username.trim()),
    where('pin', '==', +formProps.pin)
  );

  const accSnapshot = await getDocs(accQuery);

  if (accSnapshot.empty) alert('Usuario o contraseña incorrectos!');

  const doc = accSnapshot.docs[0];
  const movQuery = query(movementsRef, where('idUser', '==', doc.id));
  const movSnapshot = await getDocs(movQuery);

  const acc = doc.data();
  const movements = [];

  movSnapshot.forEach(doc => {
    const { amount, date } = doc.data();

    movements.push({ amount, date });
  });

  const account = new Account(
    acc.id,
    acc.owner,
    acc.locale,
    acc.username,
    movements
  );

  cb(account);

  inputLoginUsername.value = '';
  inputLoginPin.value = '';

  inputLoginPin.blur();

  labelWelcome.textContent = `Bienvenido ${account.owner.split(' ')[0]}!`;

  containerApp.style.opacity = 100;
  updateUI(account);

  console.log(account);
};

export { loginHandler };
