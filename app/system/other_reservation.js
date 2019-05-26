import { request } from "tns-core-modules/http";
import api from "./api";
import Session from "./session";
import config from "../config";

//  const baseUrl = process.env.apiProtocol + '://jupiter.binit.co/cesap/api/v1/otras_reservas/';
const baseUrl = config[process.env.mode].otherReservationsApi;

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

          api.loginToken().then(r => {
            if(r.token) {
              data = data ? JSON.parse(data) : null;
              this.
                callApi(resource, data, method, true)
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

  loginToken() {
    const token = Session.getToken();
    const user = Session.getUser();
    return this.callApi('user/applogintoken', {token, uid: user.uid}, 'POST', true)
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
