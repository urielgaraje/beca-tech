'use strict';
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Uriel Blanco ',
  movements: [
    { value: 200, date: '2019-11-18T21:31:17.178Z' },
    { value: 450, date: '2019-12-23T07:42:02.383Z' },
    { value: -400, date: '2020-01-28T09:15:04.904Z' },
    { value: 3000.67, date: '2020-04-01T10:17:24.185Z' },
    { value: -650, date: '2020-05-08T14:11:59.604Z' },
    { value: -130, date: '2022-04-20T17:01:17.194Z' },
    { value: 70.43, date: '2022-04-25T12:36:17.929Z' },
    { value: 1300, date: '2022-04-24T10:51:36.790Z' },
  ],
  interestRate: 1.2, // %
  pin: 1111,
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

let currentAccount, timer;

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

    sayHello(currentAccount.owner);

    labelWelcome.textContent = `Bienvenido ${
      currentAccount.owner.split(' ')[0]
    }!`;

    containerApp.style.opacity = 100;
    updateUI(currentAccount);

    if (timer) clearTimeout(timer);
    timer = startLogOutTimer();
  }
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

function displayMovements(acc, sorted = false) {
  containerMovements.innerHTML = '';

  const movs = sorted
    ? acc.movements
        .slice()
        .sort(
          (first, second) =>
            new Date(first.date).getTime() - new Date(second.date).getTime()
        )
    : acc.movements;

  movs.forEach(function (mov, index) {
    const date = new Date(mov.date);
    const displayDate = formatMovementDate(date, acc.locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${
          mov.value >= 0 ? 'deposit' : 'withdrawal'
        }">${mov.value >= 0 ? 'Ingreso' : 'Retiro'}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${Number.parseFloat(mov.value)
          .toFixed(2)
          .replace('.', ',')}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function calcDisplayBalance(acc) {
  const total = acc.movements.reduce(function (previousValue, currentValue) {
    return parseFloat(previousValue + currentValue.value);
  }, 0);

  labelBalance.textContent = `${total.toFixed(2).replace('.', ',')}€`;
}
function calcDisplaySummary(acc) {
  const incomes = acc.movements
    .filter(function (mov) {
      return mov.value > 0;
    })
    .reduce(function (prevValue, currValue) {
      return prevValue + currValue.value;
    }, 0);

  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const withdrawals = acc.movements
    .filter(function (mov) {
      return mov.value < 0;
    })
    .reduce(function (pValue, cValue) {
      return pValue + cValue.value;
    }, 0);

  labelSumOut.textContent = `${withdrawals.toFixed(2)}€`;

  const interest = acc.movements
    .filter(function (mov) {
      return mov.value > 0;
    })
    .map(function (deposit) {
      return (deposit.value * acc.interestRate) / 100;
    })
    .filter(function (num) {
      return num >= 1;
    })
    .reduce(function (prevVal, currVal) {
      return prevVal + currVal;
    }, 0);

  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
}

function updateUI(acc) {
  displayMovements(acc);

  calcDisplayBalance(acc);

  calcDisplaySummary(acc);
}

const startLogOutTimer = function () {
  let time = 300;

  const timer = setInterval(function () {
    //setInterval Ejecuta una función o un fragmento de código de forma repetitiva cada vez que termina el periodo de tiempo determinado

    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    //trunc devuelve la parte entera de un numero removiendo cualquier dígito decimal
    //padStart rellena la cadena actual con una cadena dada (repetida eventualmente) de modo que la cadena resultante alcance una longitud dada
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    time--;

    if (time === -1) {
      clearInterval(timer); //Cancela una acción reiterativa que se inició mediante una llamada a setInterval
      labelWelcome.textContent = 'Debes volver a loguearte';
      containerApp.style.opacity = 0;
    }
  }, 1000);

  return timer;
};

let sort = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sort);
  sort = !sort;
});
