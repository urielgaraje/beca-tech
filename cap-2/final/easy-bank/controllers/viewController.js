import {
  containerMovements,
  labelSumIn,
  labelSumOut,
  labelSumInterest,
	labelBalance
} from '../common/variables.js';

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
    const date = new Date(mov.date.seconds * 1000);
    const displayDate = formatMovementDate(date, acc.locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${
          mov.amount >= 0 ? 'deposit' : 'withdrawal'
        }">${mov.amount >= 0 ? 'Ingreso' : 'Retiro'}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${Number.parseFloat(mov.amount)
          .toFixed(2)
          .replace('.', ',')}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function calcDisplayBalance(acc) {
  const total = acc.movements.reduce(function (previousValue, currentValue) {
    return parseFloat(previousValue + currentValue.amount);
  }, 0);

  labelBalance.textContent = `${total.toFixed(2).replace('.', ',')}€`;
}
function calcDisplaySummary(acc) {
  const incomes = acc.movements
    .filter(function (mov) {
      return mov.amount > 0;
    })
    .reduce(function (prevValue, currValue) {
      return prevValue + currValue.amount;
    }, 0);

  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const withdrawals = acc.movements
    .filter(function (mov) {
      return mov.amount < 0;
    })
    .reduce(function (pValue, cValue) {
      return pValue + cValue.amount;
    }, 0);

  labelSumOut.textContent = `${withdrawals.toFixed(2)}€`;

  const interest = acc.movements
    .filter(function (mov) {
      return mov.amount > 0;
    })
    .map(function (deposit) {
      return (deposit.amount * acc.interestRate) / 100;
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

export { updateUI };
