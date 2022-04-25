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
  movementsDates: [
    "2022-04-24T21:31:17.178Z",
    "2022-04-25T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T12:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: 'Stefany Apolo',
  movements: [5000, 3400.40, -150, -790, -3210, -1000, 8500.90, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
  
};

const account3 = {
  owner: 'Andres Ortiz',
  movements: [200, -200, 340.25, -300, -20, 50, 400.75, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account4 = {
  owner: 'Alberto Barrios',
  movements: [430, 1000.85, 700, 50.75, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2022-04-28T23:36:17.929Z",
    "2022-04-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "es-ES", // de-DE
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
const logoutTimer = document.querySelector('.logout-timer');

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

let currentAccount, timer;

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

function formatMovementDate(date, locale){
  const calcDayPassed=(date1, date2)=>{

    return Math.round(Math.abs(date2-date1)/(1000*60*60*24));
  };
  // recibe la fecha actual 
  const daysPassed = calcDayPassed(new Date(), date);
  let dateFormatted;
  switch(daysPassed){
    case 0:
      dateFormatted='Hoy';
      break;
    case 1:
      dateFormatted='Ayer';
      break;
    case(2,3,4,5,6,7):
      dateFormatted=`${daysPassed} días atrás`
      break;
      default:
        dateFormatted=new Intl.DateTimeFormat(locale).format(date);


      return dateFormatted;
  }

}

function  displayMovements(acc){

  containerMovements.innerHTML='';

  acc.movements.forEach(function(mov, index){
  let date = new Date(acc.movementsDates[index]);
  const displayDate=formatMovementDate(date,acc.locale)
  
    const html=`
 
    <div class="movements__row">
      <div class="movements__type movements__type--${
        mov >=0 ? 'deposit' : 'withdrawal'
      }">${mov >=0 ? 'Ingreso' : 'Retiro'} </div>
      <div class="movements__date">${(displayDate)}</div>

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

/*function startTimer(duration, display){
  let timer = duration, minutes, seconds;
  setInterval(function(){
    minutes =parseInt(timer /60,10);
    seconds =parseInt(timer %60,10);
    seconds = seconds <10?"0"+ seconds : seconds;
    display.textContent=seconds;
            

  if(--timer<0){
    containerApp.style.opacity=0;
    labelWelcome.textContent='Debes volver a loguearte';
  }else{
    totalTime--;
    setTimeout("timer()",1000);
  }
})
const startTimer= function(){
    let time=300;
  const timer =setInterval(function (){
    let min= String(Math.trunc(time/60)).padStart(2,0);
    let sec= String(time%60).padStart(2,0);
    //en cada llamada imprimo el tiempo restante
    labelTimer.textContent=`${min}:${sec}`;
    time--;
    if(time=== 0){
      clearInterval(timer);
      labelWelcome.textContent = "Logueate para empezar";
      containerApp.style.opacity=0;
    }
 
  } ,1000);

  //llamo al timer cada segundo

  return timer;
 
};

let time_minutes = 5; // Value in minutes
let time_seconds = 00; // Value in seconds

let duration = time_minutes * 60 + time_seconds;
function paddedFormat(num) {
  return num < 10 ? "0" + num : num; 
}
labelTimer.textContent=`${paddedFormat(min)}:${paddedFormat(sec)}`;
function startCountDown(duration, element) {
  let secondsRemaining = duration;
  let min = 0;
  let sec = 0;
  
  let countInterval = setInterval(function () {
  
      min = parseInt(secondsRemaining / 60);
      sec = parseInt(secondsRemaining % 60);
  
      labelTimer.textContent = `${paddedFormat(min)}:${paddedFormat(sec)}`;
  
      secondsRemaining = secondsRemaining - 1;
      if (secondsRemaining < 0) { clearInterval(countInterval) };
  
  }, 1000);
}
*/
     
               