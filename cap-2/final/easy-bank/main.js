import { loginHandler } from './controllers/loginController.js';
import { loginForm } from './common/variables.js';

let currentAccount;

loginForm.addEventListener('submit', function (event) {
  loginHandler(event, currentAccount);
});
