import {
  accounts,
  inputLoanAmount,
  inputCloseUsername,
  inputClosePin,
  labelWelcome,
  labelDate,
  containerApp,
  inputTransferAmount,
  inputLoginUsername,
  inputLoginPin,
  currentAccount,
  inputTransferTo,
  

} from '../variables.js';

import { updateUI, balance } from './viewController.js';

function currentDate(date) {
  const format = {
    dd: date.getDate(),
    mm: date.getMonth() + 1,
    yyyy: date.getFullYear(),
  };

  return `${format.dd}/${format.mm}/${format.yyyy}`;
}
labelDate.textContent = currentDate(new Date());

const loanHandler=e=> {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);

  let amount = Number(inputLoanAmount.value);

  if (amount > 0) {
    currentAccount.movements.push({
      value: amount,
      date: new Date().toISOString(),
    });
  
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
}
const closeHandler=e=>{
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
}
const transferHandler =e=>{
  //transferForm.addEventListener('submit', function (e) {
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
    currentAccount.movements.push(-amountToTransfer);
    receiverAcc.movements.push(amountToTransfer);

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
   
    updateUI(currentAccount);
    //setCurrentAccount(currentAccount);
  }

  inputTransferAmount.value = inputTransferTo.value = '';
}
export{loanHandler,closeHandler,transferHandler};