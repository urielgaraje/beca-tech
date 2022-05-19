/* export class User {
  constructor(...properties) {
    for ([key, value] of properties) {
      this[key] = value;
    }
  }
} Esta sería una forma mas avanzada de crear dinamicamente las propiedades de la clase */

export class Account {
  constructor(id, owner, locale, username, movements) {
    this.id = id;
    this.owner = owner;
    this.locale = locale;
    this.username = username;
    this.movements = movements;
  }
}
