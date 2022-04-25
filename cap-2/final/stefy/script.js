'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Uriel Blanco',
  movements: [200.4321, 450, -400, 3000.30, -650, -130, 70, 1300.75],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Stefany Apolo',
  movements: [5000, 3400.40, -150, -790, -3210, -1000, 8500.90, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Andres Ortiz',
  movements: [200, -200, 340.25, -300, -20, 50, 400.75, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Alberto Barrios',
  movements: [430, 1000.85, 700, 50.75, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const loginForm=document.querySelector('.login');
const loanForm = document.querySelector('.form--loan');
const closeForm=document.querySelector('.form--close');
const transferForm=document.querySelector('.form--transfer');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'Dolar estadounidense'],
  ['EUR', 'Euro'],
  ['GBP', 'Libra esterlina'],
]);

let movements = [200, 450, -400, 3000.25, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/* const account1 = {
  owner: 'Uriel Blanco',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
}; */
// username = ub; OBJETIVO
//account.owner.split('l') => ['urie',' B','anco'];
// (a,b) => { return a + b};
// a => { return a};
//let account;

let currentAccount;

function createUsernamesSLIM(currentAccount) {
  const username = currentAccount.owner
    .split(' ') /* => ['Uriel','Blanco'];*/
    .map(word => word.toLowerCase()[0])
    .join('');

    currentAccount.username = username;

  return currentAccount;
}

function createUsernames(currentAccount) {
  const username = currentAccount.owner
    .split(' ') /* => ['Uriel','Blanco'];*/
    .map(function (word) {
      return word.toLowerCase();
    }) /* => ['uriel','blanco'];*/
    .map(function (word) {
      return word[0];
    }) /* ['u', 'b']*/
    .join(''); /* ['u', 'b']*/

    currentAccount.username = username;
}

/*
short
accounts.forEach(acc => createUsernames(acc));
very short
accounts.forEach(createUsernames);
*/

accounts.forEach(function (acc) {
  createUsernames(acc);
});

console.log(accounts);
//console.log(createUsernames(account1));



function  displayMovements(acc){

  containerMovements.innerHTML='';

  acc.movements.forEach(function(mov){
  let date = new Date();
    const html=`
 
    <div class="movements__row">
      <div class="movements__type movements__type--${
        mov >=0 ? 'deposit' : 'withdrawal'
      }">${mov >=0 ? 'Ingreso' : 'Retiro'} </div>
      <div class="movements__date">${currentDate(date)}</div>

      <div class="movements__value">${Number.parseFloat(mov).toFixed(2).replace('.',',')}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);

  });

}
function balance(acc){
  let totalMoney=acc.movements.reduce(function(previousValue, currentValue){

    return parseFloat(previousValue + currentValue);
    },0);
    
    return totalMoney;

}

function calculateBalance(acc){
  const total=acc.movements.reduce(function(previousValue, currentValue){

    return parseFloat(previousValue + currentValue);
    //0 es el valor inicial
    },0);
  labelBalance.textContent=`${total.toFixed(2).replace('.', ',')} €`;
}
function calcDisplaySummary(acc){
  const incomes=acc.movements
  .filter(function(mov){
    return mov > 0;
  })
  .reduce(function(prevValue, currValue){
 
    return prevValue+currValue;
 
  },0);
  labelSumIn.textContent=`${incomes.toFixed(2)}€`;
 
  const withdrawals = acc.movements
  .filter(function(mov){
    return mov<0;
  })
  .reduce(function(pValue, cValue){
    return pValue+cValue;
  },0);
  labelSumOut.textContent=`${withdrawals.toFixed(2)}€`;
 
  const interest = acc.movements
  .filter(function(mov){
    return mov > 0;
  })
  .map(function(deposit){
    return (deposit * acc.interestRate)/100;
  })
  .filter(function(num){
    return num>=1;
  })
  .reduce(function(prevVal, currVal){
    return prevVal+currVal;
  },0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
 
}
 
function updateUI(acc){
  displayMovements(acc);
  calculateBalance(acc);
  calcDisplaySummary(acc);
 
}


loginForm.addEventListener('submit', function(event){
  event.preventDefault();
//target contiene el form, obtenemos los datos del formulario clave:valor
  const formData = new FormData(event.target);
//fromEntries retorna un objeto creado por clave valor
  const formProps = Object.fromEntries(formData);
/*accedo a una propiedad del objeto que me devolvió el fromEntries
formProps.username
formProps.pin*/
//acc sería cada objeto del array account
currentAccount=accounts.find(function(acc){
  return acc.username === formProps.username.trim();

});

if(!currentAccount){
  alert('Error: usuario no encontrado!');
}


  //+formProps parseo de string a number
  //con account? me aseguro que exista antes de realizar la comprobación del pin
  if( currentAccount?.pin === +formProps.pin ){  
    containerApp.style.opacity=100;
    updateUI(currentAccount);
    inputLoginUsername.value="";
    inputLoginPin.value="";
    inputLoginPin.blur();
    labelWelcome.textContent=`Bienvenido, ${currentAccount?.owner.split(' ')[0]} !`;

  }

  

/*evaluo si el usuario que hay en el array y el escrito por el usuario es el mismo  
 if(acc.username ===formProps.username){
    return true;
  }else{
    return false;
  } */
 
/* const account = accounts.find(acc => acc.username === fromProps.username);
  */ 
console.log(currentAccount);

});
function currentDate(date){
  const format ={
    dd: date.getDate(),
    mm: date.getMonth()+1,
    yyyy: date.getFullYear()
  }


return `${format.dd}/${format.mm}/${format.yyyy}`;
  
}
labelDate.textContent=currentDate(new Date());


loanForm.addEventListener('submit', function (e){
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);

  let amount = Number(inputLoanAmount.value);
 
  if(amount>0){
    currentAccount.movements.push(amount);
    console.log(movements);
    updateUI(currentAccount);
    
  }
  inputLoanAmount.value="";
})
closeForm.addEventListener('submit', function (e){
  e.preventDefault();
const closeUser=inputCloseUsername.value.toLowerCase().trim();
const closePin=Number(inputClosePin.value);

if(closeUser===currentAccount.username && closePin===currentAccount.pin){
 
  labelWelcome.textContent=`Gracias por usar nuestro servicio ${currentAccount?.owner.split(' ')[0]} !`;;
  inputLoginUsername.value=inputLoginPin.value= "";

  const index = accounts.findIndex((acc) => acc.username === closeUser);
  //elimino del array el elemento
  accounts.splice(index,1);
  }
  containerApp.style.opacity=0;

})
transferForm.addEventListener('submit', function(e){
  e.preventDefault();
  const receiverAcc =accounts.find(acc=>acc.username===inputTransferTo.value);
  const amountToTransfer=Number(inputTransferAmount.value);
  let moneyAvailable=balance(currentAccount);
  console.log(receiverAcc);
  console.log(moneyAvailable);

  if(amountToTransfer>0 && receiverAcc && moneyAvailable>=amountToTransfer && currentAccount.username !== receiverAcc.username){
    currentAccount.movements.push(-amountToTransfer);
    receiverAcc.movements.push(amountToTransfer);


    updateUI(currentAccount);
  }
  
inputTransferAmount.value=inputTransferTo.value= "";

})
