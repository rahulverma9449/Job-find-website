export default class UserModel {
    constructor( name, email, password) {
      this.name = name;
      this.email = email;
      this.password = password;
    }
  
    static add(name, email, password) {
      const newUser = new UserModel(
        name,
        email,
        password
      );
      users.push(newUser);
    }
    static get(){
      return users;
    }
    static isValidUser(email, password) {
      const result = users.find(
        (u) =>
          u.email == email && u.password == password
      );
      return result;
    }
    static isValidUser(email, password) {
      const result = users.find(
        (u) =>
          u.email == email && u.password == password
      );
      return result;
    }
  }


  var users =[];
  