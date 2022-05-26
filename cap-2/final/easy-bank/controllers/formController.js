import {
  inputLoanAmount,
  inputCloseUsername,
  inputClosePin,
  labelWelcome,
  labelDate,
  containerApp,
  inputTransferAmount,
  inputLoginUsername,
  inputLoginPin,
  inputTransferTo,
} from '../common/variables.js';
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
  addDoc,
} from 'firebase/firestore';
import { db } from '../common/firebase.js';

import { updateUI, balance } from './viewController.js';

labelDate.textContent = currentDate(new Date());

function currentDate(date) {
  const format = {
    dd: date.getDate(),
    mm: date.getMonth() + 1,
    yyyy: date.getFullYear(),
  };
  return `${format.dd}/${format.mm}/${format.yyyy}`;
}
const loanHandler = async (e, currentAccount) => {
  e.preventDefault();
  let amount = Number(inputLoanAmount.value);
  const time = Timestamp.now();
  if (amount > 0) {
    addDoc(collection(db, 'movements'), {
      amount,
      date: time,
      idUser: currentAccount.id,
    }).then(doc => {
      currentAccount.movements.push({
        amount,
        date: time,
      });
      updateUI(currentAccount);
      inputLoanAmount.value = '';
    });
  }
};

const closeHandler = async (e, currentAccount) => {
  //closeForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const closeUser = inputCloseUsername.value.toLowerCase().trim();
  const closePin = Number(inputClosePin.value);
  if (
    closeUser === currentAccount.username &&
    closePin === currentAccount.pin
  ) {
    console.log(currentAccount.username);
    labelWelcome.textContent = `Gracias por usar nuestro servicio ${
      currentAccount?.owner.split(' ')[0]
    } !`;
    inputLoginUsername.value = inputLoginPin.value = '';
    // const index = accounts.findIndex(acc => acc.username === closeUser);
    //elimino del array el elemento
    //accounts.splice(index, 1);
  }
  inputClosePin.value = inputCloseUsername.value = '';
  containerApp.style.opacity = 0;
};

const transferHandler = async (e, currentAccount) => {
  e.preventDefault();
  const time = Timestamp.now();
  //const doc= await getAccount()
  const receiverAcc = inputTransferTo.value; //username
  console.log(receiverAcc);
  const accountsRef = collection(db, 'accounts');
  const accountQuery = query(
    accountsRef,
    where('username', '==', receiverAcc.trim())
  );
  const accountSnapshot = await getDocs(accountQuery);
  console.log(accountSnapshot);
  if (accountSnapshot.empty) alert('Usuario incorrecto!');
  const doc = accountSnapshot.docs[0];
  const amountToTransfer = Number(inputTransferAmount.value);
  let moneyAvailable = Number(balance(currentAccount));
  console.log(receiverAcc);
  console.log(moneyAvailable);
  if (
    amountToTransfer > 0 &&
    receiverAcc &&
    moneyAvailable >= amountToTransfer &&
    currentAccount.username !== receiverAcc.username
  ) {
    const doc1 = addDoc(collection(db, 'movements'), {
      amount: amountToTransfer,
      date: time,
      idUser: doc.id,
    });
    const doc2 = addDoc(collection(db, 'movements'), {
      amount: -amountToTransfer,
      date: time,
      idUser: currentAccount.id,
    });
    const result = Promise.all([doc1, doc2]);
    result.then(data => {
      currentAccount.movements.push({
        amount: -amountToTransfer,
        date: time,
      });
      inputTransferAmount.value = inputTransferTo.value = '';
      updateUI(currentAccount);
    });
  }
};
export { loanHandler, closeHandler, transferHandler };
