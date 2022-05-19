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

const loginHandler = async (event, currentAccount) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formProps = Object.fromEntries(formData);

  const accountsRef = collection(db, 'accounts');
  const movementsRef = collection(db, 'movements');

  /**
   * Tienen las referencias a cada coleccion tanto los movimientos como las cuentas
   * 
   * Los movimientos estan relacionados por su campo 'idUser' el cual pueden obtener de la cuenta en su propiedad 'id'
   * 
   * Los pasos serían los siguientes:
   * 
   * 1. Recuperan la cuenta en base a su 'username' y su 'pin' de la coleccion de accounts
   * 2. Una vez tienen la cuenta (en caso de que exista) tienen que traer de la coleccion de 'movements'
   *    todos los registros con el mismo 'idUser' que el de la cuenta (pueden obtener el id desdel el mismo doc).
   * 3. Como pueden ver abajo si pudieron obtener el 'account' y la lista de 'movements' luego lo que hago 
   *    es crear un objeto Account.
   * 
   * No se preocupen por todo lo demás de momento que si consiguen estos datos todo funciona correctamente!
   * 
   * Pista: Ya tienen todas las importaciones que necesitarían...args
   * Docs: https://firebase.google.com/docs/firestore/query-data/queries?hl=es&authuser=2#execute_a_query
   *       https://firebase.google.com/docs/firestore/query-data/get-data?authuser=2&hl=es
   * 
   * Como las fechas firebase las guarda en miliseconds ya corregí el comportamiento en el viewController todo funciona,
   * chequeenlo para que vean como esta hecho.
   */

  currentAccount = new Account(
    acc.id,
    acc.owner,
    acc.locale,
    acc.username,
    movements
  );

  inputLoginUsername.value = '';
  inputLoginPin.value = '';

  inputLoginPin.blur();

  labelWelcome.textContent = `Bienvenido ${
    currentAccount.owner.split(' ')[0]
  }!`;

  containerApp.style.opacity = 100;
  updateUI(currentAccount);
	
  console.log(currentAccount);
};

export { loginHandler };
