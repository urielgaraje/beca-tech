import {
  accounts,
  currentAccount,
  timer,
  inputLoginUsername,
  inputLoginPin,
  labelWelcome,
  containerApp,
  setCurrentAccount,
  setTimer,
  labelTimer
} from '../variables.js';

import { updateUI } from './viewController.js';

const startLogOutTimer = function () {
    let time = 300;
    
  
    const timer = setInterval(function () {
      const min = String(Math.trunc(time / 60)).padStart(2, 0);
  
      const sec = String(time % 60).padStart(2, 0);
  
      labelTimer.textContent = `${min}:${sec}`;
  
      time--;
  
      if (time === -1) {
        clearInterval(timer);
        labelWelcome.textContent = 'Debes volver a loguearte';
        containerApp.style.opacity = 0;
      }
    }, 1000);
  
    return timer;
  };

const loginHandler = event => {
  event.preventDefault();
  //target contiene el form, obtenemos los datos del formulario clave:valor
  const formData = new FormData(event.target);
  //fromEntries retorna un objeto creado por clave valor
  const formProps = Object.fromEntries(formData);
  /*accedo a una propiedad del objeto que me devolvió el fromEntries
  formProps.username
  formProps.pin*/
  //acc sería cada objeto del array account
  let accFound ;
  accFound = accounts.find(function (acc) {
    return acc.username === formProps.username.trim();
  });

  if (!accFound) {
    alert('Error: usuario no encontrado!');
  }

  //+formProps parseo de string a number
  //con account? me aseguro que exista antes de realizar la comprobación del pin
  if (accFound?.pin === +formProps.pin) {
    containerApp.style.opacity = 100;
    updateUI(accFound);
    setCurrentAccount(accFound);
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    //sayHello(currentAccount.owner);
    labelWelcome.textContent = `Bienvenido, ${
      accFound?.owner.split(' ')[0]
    } !`;

    if (timer) clearInterval(timer);
    setTimer(startLogOutTimer());
   
  }

  console.log(currentAccount);
};
export { loginHandler };
/* function createUsernamesSLIM(currentAccount) {
  const username = currentAccount.owner
    .split(' ') /* => ['Uriel','Blanco'];
    .map(word => word.toLowerCase()[0])
    .join('');

  currentAccount.username = username;

  return currentAccount;
}
 */
