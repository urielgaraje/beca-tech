'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Uriel Blanco ',
  movements: [200, 450, -400, 3000.67, -650, -130, 70.43, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-04-20T17:01:17.194Z',
    '2022-04-25T12:36:17.929Z',
    '2022-04-24T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Stefany Apolo',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US', // de-DE
};

const account3 = {
  owner: 'Andres Ortiz',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US', // de-DE
};

const account4 = {
  owner: 'Alberto Barrios',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'es-ES', // de-DE
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
    .split(' ') /* => ['Uriel','Blanco', ''];*/
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
    return acc.username === formProps.username.trim();
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

function formatMovementDate(date, locale) {
  const calcDayPassed = (date1, date2) => {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  };

  const daysPassed = calcDayPassed(new Date(), date);
  let dateFormatted;

  switch (daysPassed) {
    case 0:
      dateFormatted = 'Hoy';
      break;
    case 1:
      dateFormatted = 'Ayer';
      break;
    case (2, 3, 4, 5, 6, 7):
      dateFormatted = `${daysPassed} días atras`;
      break;
    default:
      dateFormatted = new Intl.DateTimeFormat(locale).format(date);
      break;
  }

  return dateFormatted;
}

function displayMovements(acc) {
  containerMovements.innerHTML = '';

  acc.movements.forEach(function (mov, index) {
    const date = new Date(acc.movementsDates[index]);
    const displayDate = formatMovementDate(date, acc.locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${
          mov >= 0 ? 'deposit' : 'withdrawal'
        }">${mov >= 0 ? 'Ingreso' : 'Retiro'}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${Number.parseFloat(mov)
          .toFixed(2)
          .replace('.', ',')}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function calcDisplayBalance(acc) {
  const total = acc.movements.reduce(function (previousValue, currentValue) {
    return parseFloat(previousValue + currentValue);
  }, 0);

  labelBalance.textContent = `${total.toFixed(2).replace('.', ',')}€`;
}

function updateUI(acc) {
  displayMovements(acc);

  calcDisplayBalance(acc);

  //calcDisplaySummary(acc);
}
