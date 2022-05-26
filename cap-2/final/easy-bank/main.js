import { loginHandler } from './controllers/loginController';
import {
  loanHandler,
  transferHandler,
  closeHandler,
} from './controllers/formController';
import {
  loginForm,
  loanForm,
  transferForm,
  closeForm,
} from './common/variables';

let currentAccount;

const setAccount = acc => (currentAccount = acc);

loginForm.addEventListener('submit', async function (event) {
  await loginHandler(event, setAccount);
});

loanForm.addEventListener('submit', function (event) {
  loanHandler(event, currentAccount);
});

transferForm.addEventListener('submit', function (event) {
  transferHandler(event, currentAccount);
});

closeForm.addEventListener('submit', function (event) {
  closeHandler(event, currentAccount);
});
