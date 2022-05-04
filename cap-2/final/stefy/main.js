import './common.js';
import { closeForm, loanForm, loginForm, transferForm } from './variables.js';
import { loginHandler } from './controller/loginController.js';
import {
  loanHandler,
  transferHandler,
  closeHandler,
} from './controller/formController.js';

loginForm.addEventListener('submit', loginHandler);

loanForm.addEventListener('submit', loanHandler);
transferForm.addEventListener('submit', transferHandler);
closeForm.addEventListener('submit', closeHandler);
