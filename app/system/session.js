import {getString, setString} from "tns-core-modules/application-settings";

/* export default class Session {

  clear() {
      clear()
  }

  getToken() { 
      return getString('token')
  }

  setToken(token) {
    setString('token', token);
  }
} */

const Session = {
  getToken() {
    return getString('token');
  },

  setToken(token) {
    return setString('token', token)
  },

  getSessId() {
    return getString('SessId');
  },

  setSessId(SessId) {
    return setString('SessId', SessId)
  },

  getSessName() {
    return getString('SessName');
  },

  setSessName(SessName) {
    return setString('SessName', SessName)
  },

  setUser(user) {
    return setString('user', JSON.stringify(user))
  },

  getUser() {
    return JSON.parse(getString('user'));
  },

  getJSON(name){
    let value = getString(name);
    if(value){
      return JSON.parse(value);
    } else {
      return false;
    }
  },

  setJSON(name, value){
    return setString(name, JSON.stringify(value))
  }

}

export default Session;