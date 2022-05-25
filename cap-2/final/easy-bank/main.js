import { loginHandler } from './controllers/loginController.js';
import { loanHandler } from './controllers/formController.js';
import { loginForm, loanForm } from './common/variables.js';

let currentAccount;

const setAccount = acc => (currentAccount = acc);

loginForm.addEventListener('submit', async function (event) {
  await loginHandler(event, setAccount);
});

loanForm.addEventListener('submit', function (event) {
  loanHandler(event, currentAccount);
});
