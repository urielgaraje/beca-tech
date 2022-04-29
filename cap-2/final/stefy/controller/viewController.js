import { containerMovements ,labelBalance, labelSumIn, labelSumOut, labelSumInterest} from "../variables.js";
const updateUI = acc => {
  displayMovements(acc);
  calculateBalance(acc);
  calcDisplaySummary(acc);
};
function formatMovementDate(date, locale) {
  const calcDayPassed = (date1, date2) => {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  };

  let dateFormatted;
  const daysPassed = calcDayPassed(new Date(), date);
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
  // la copia o el original dependiendo de sorted---ordena por valor
  //const movs = sorted ? acc.movements.slice().sort((first,second)=>first.value - second.value) : acc.movements;
  //ordena por fecha
  const movs = sorted
    ? acc.movements
        .slice()
        .sort(
          (first, second) =>
            new Date(first.date).getTime() - new Date(second.date).getTime()
        )
    : acc.movements;
  movs.forEach(function (mov) {
    let date = new Date(mov.date);
    const displayDate = formatMovementDate(date, acc.locale);

    const html = `
   
      <div class="movements__row">
        <div class="movements__type movements__type--${
          mov.value >= 0 ? 'deposit' : 'withdrawal'
        }">${mov.value >= 0 ? 'Ingreso' : 'Retiro'} </div>
        <div class="movements__date">${displayDate}</div>
  
        <div class="movements__value">${Number.parseFloat(mov.value)
          .toFixed(2)
          .replace('.', ',')}€</div>
      </div>
      `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}
function balance(acc) {
  let totalMoney = acc.movements.reduce(function (previousValue, currentValue) {
    return parseFloat(previousValue + currentValue);
  }, 0);

  return totalMoney;
}

function calculateBalance(acc) {
  const total = acc.movements.reduce(function (previousValue, currentValue) {
    return parseFloat(previousValue + currentValue.value);
    //0 es el valor inicial
  }, 0);
  labelBalance.textContent = `${total.toFixed(2).replace('.', ',')} €`;
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

/* btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sort);
  sort = !sort;
}); */
export { updateUI };
