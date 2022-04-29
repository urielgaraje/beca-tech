import {accounts}from './variables.js';
/*function log(){
    console.log('Funciona');
}
log();*/
//funcion que se llama sola IIFE
/* (function (){
    console.log('Hola');
    window.test='Hola!';
})(); */
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
  

  accounts.forEach(function (acc) {
    createUsernames(acc);
  });
  
  console.log(accounts);
  //console.log(createUsernames(account1));
  
