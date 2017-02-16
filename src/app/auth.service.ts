import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  id: string;
  constructor(private http: Http) { }

  login(id, hub) {
    let json = JSON.stringify({"devicetype": "shine#web"});
    return this.http.post(`http://${hub}/api`, json)
      .map((response: Response) => {
        let current = localStorage.getItem(id);

        if(this.id != undefined) {
          return this.getEndpoint();
        }

        let resp = response.json()[0]
        if("error" in resp) {
          throw new Error(resp.error.description);
        }

        if("success" in resp) {
          let user = resp.success.username;
          localStorage.setItem(id, `http://${hub}/api/${user}`);
          this.id = id;
          return this.getEndpoint();
        }

        console.log(resp);
        throw new Error(`Could not parse response from server: ${resp.stringify}`);
      }
    );
  }

  getUpnpHubs() {
    // [{"id": "1234567890abcdef", "internalipaddress": "localhost:8888"}]
    return this.http.get('https://www.meethue.com/api/nupnp')
      .map((response: Response) => {
        return response
      }
    );
  }

  getEndpoint() {
    return localStorage.getItem(this.id);
  }

  isLoggedIn() {
    if(localStorage.getItem(this.id)) {
      return true
    }
    return false
  }
}
