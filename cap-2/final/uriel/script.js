'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Uriel Blanco',
  movements: [200, 450, -400, 3000.67, -650, -130, 70.43, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Stefany Apolo',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Andres Ortiz',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Alberto Barrios',
  movements: [430, 1000, 700, 50, 90],
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

const loginForm = document.querySelector('.login');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'Dolar estadounidense'],
  ['EUR', 'Euro'],
  ['GBP', 'Libra esterlina'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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

function createUsernamesSLIM(account) {
  const username = account.owner
    .split(' ') /* => ['Uriel','Blanco'];*/
    .map(word => word.toLowerCase()[0])
    .join('');

  account.username = username;

  return account;
}

function createUsernames(account) {
  const username = account.owner
    .split(' ') /* => ['Uriel','Blanco'];*/
    .map(function (word) {
      return word.toLowerCase();
    }) /* => ['uriel','blanco'];*/
    .map(function (word) {
      return word[0];
    }) /* ['u', 'b']*/
    .join(''); /* 'ub' */

  account.username = username;
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

/* btnLogin.addEventListener('click', function (event) {
  event.preventDefault();

  console.log(inputLoginUsername.value);
  console.log(inputLoginPin.value);

  console.log(event);
}); */

let currentAccount;

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formProps = Object.fromEntries(formData);

  currentAccount = accounts.find(function (acc) {
    return acc.username === formProps.username;
  });

  // function(a,b){
  //  return a + b;
  //}
  // (a,b) => { return a +b };
  // (a,b) =>  a + b ;
  //const account = accounts.find(acc => acc.username === formProps.username);
  // undefined & null === false

  if (!currentAccount) {
    alert('Error usuario no encontrado!');
  }

  if (currentAccount?.pin === +formProps.pin) {
    inputLoginUsername.value = '';
    inputLoginPin.value = '';

    inputLoginPin.blur();

    labelWelcome.textContent = `Bienvenido ${
      currentAccount.owner.split(' ')[0]
    }!`;

    containerApp.style.opacity = 100;
    updateUI(currentAccount);
  }

  /*  console.log(formProps);
  console.log(event); */
});

function displayMovements(acc) {
  containerMovements.innerHTML = '';

  acc.movements.forEach(function (mov) {
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${
          mov >= 0 ? 'deposit' : 'withdrawal'
        }">${mov >= 0 ? 'Ingreso' : 'Retiro'}</div>
        <div class="movements__date"> 6/4/2022</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function updateUI(acc) {
  displayMovements(acc);
}
