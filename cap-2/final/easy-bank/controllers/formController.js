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

import { db } from '../common/firebase.js';

import { Timestamp, addDoc, collection } from 'firebase/firestore';

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

const closeHandler = e => {
  //closeForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const closeUser = inputCloseUsername.value.toLowerCase().trim();
  const closePin = Number(inputClosePin.value);

  if (
    closeUser === currentAccount.username &&
    closePin === currentAccount.pin
  ) {
    labelWelcome.textContent = `Gracias por usar nuestro servicio ${
      currentAccount?.owner.split(' ')[0]
    } !`;
    inputLoginUsername.value = inputLoginPin.value = '';

    const index = accounts.findIndex(acc => acc.username === closeUser);
    //elimino del array el elemento
    accounts.splice(index, 1);
  }
  containerApp.style.opacity = 0;
};
const transferHandler = e => {
  e.preventDefault();

  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  const amountToTransfer = Number(inputTransferAmount.value);
  let moneyAvailable = balance(currentAccount);
  console.log(receiverAcc);
  console.log(moneyAvailable);

  if (
    amountToTransfer > 0 &&
    receiverAcc &&
    moneyAvailable >= amountToTransfer &&
    currentAccount.username !== receiverAcc.username
  ) {
    currentAccount.movements.push({
      value: -amountToTransfer,
      date: new Date().toISOString(),
    });
    receiverAcc.movements.push({
      value: amountToTransfer,
      date: new Date().toISOString(),
    });

    updateUI(currentAccount);
  }

  inputTransferAmount.value = inputTransferTo.value = '';
};
export { loanHandler, closeHandler, transferHandler };
