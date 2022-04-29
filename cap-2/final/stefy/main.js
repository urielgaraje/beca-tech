import './common.js';
import {loginForm} from './variables.js';
import {loginHandler} from './controller/loginController.js';

loginForm.addEventListener('submit',loginHandler)