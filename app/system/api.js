import { device } from "tns-core-modules/platform";
import { request } from "tns-core-modules/http";
import Session from "./session";
import config from "../config";

// const baseUrl = process.env.apiProtocol + '://jupiter.binit.co/cesap/ezapp/';
const baseUrl = config[process.env.mode].ezappApi;

export default {

    callApi(resource, data, method, skipRetry) {
      let token;
      let headers = {
        "Content-Type": "application/json",
      }

      if(token = Session.getToken()) {
        // headers['Authentication'] = 'Bearer ' + token;
        headers['X-CSRF-token'] = token;
      }
      else
      {
        headers['Cookie'] = token;
      }

      console.log(method + ': ' + baseUrl + resource);
      console.log(data);
      console.log(headers);

      if(data) {
        data = JSON.stringify(data);
      }
      
      return new Promise((resolve, reject) => {
        request({
          url: baseUrl + resource,
          method: method,
          headers: headers,
          content: data
        }).then((r) => {
          console.log(r.statusCode);
          console.log(r.content.toString())
          
          if(r.statusCode == 200) {
            resolve(r.content.toJSON());
          } if(r.statusCode == 403 && !skipRetry) {

            console.log(" ******************* The session is closed: Retrying *******************");

            this.loginToken().then(r => {
              if(r.token) {
                data = data ? JSON.parse(data) : null;
                this.callApi(resource, data, method, true)
                .then(r => {
                    resolve(r);
                })
                .catch(r => {
                  reject(r);
                });
              } else {
                reject(r);
              }
            });

          } else {
            reject(r);
          }
        }).catch(e => {
          reject(e);
        })
      });

    },

    isLoggedIn() {
      return !!Session.getToken();
    },

    logout() {
      const data = {
        token: Session.getToken(),
        uid: Session.getUser().uid,
        device: device.uuid
      }

      Session.setToken('');
      return this.callApi('user/applogout', data, 'POST', true)
        .then(() => {
          Session.setToken('');
          return this;
        })
        .catch((r) => {
          console.log(r);
          console.log('Cannot logout api-163');
        })
        .finally(() => {
          this.$vue.$modal.close();
          this.$vue.$store.dispatch('clearHistory', {state: false});
          this.$vue.$navigateTo(this.$vue.$routes.Login, {clearHistory: true});
        })
    },

    login(user) {
      const data = {
        username: user.username,
        password: user.password,
        device: device.uuid
      }
      Session.setToken('');
      return this.callApi('user/applogin', data, 'POST', true)
        .then((r) => {
          Session.setToken(r.token);
          Session.setUser(r.user);
        }).catch(r => {
          console.log(r);
        });
    },
    
    resetPassword(user) {
      return this.callApi('user/request_new_password', {name:user}, 'POST', true);
    },

    loginToken() {
      const data = {
        token: Session.getToken(),
        uid: Session.getUser().uid,
        device: device.uuid
      }

      return this.callApi('user/applogintoken', data, 'POST', true)
        .then((r) => {
          Session.setToken(r.token);
          return r;
        })
        .catch((r) => {
          console.log(r);
          this.logout();
        });
    },

    get(res) {
      return this.callApi(res, null, 'GET');
    },

    post(res, data) {
      return this.callApi(res, data, 'POST');
    }
}
