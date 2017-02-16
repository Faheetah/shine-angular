import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

import { AlertService } from './alert.service';

@Injectable()
export class AuthService {
  id: string;
  constructor(
    private http: Http,
    private router: Router,
    private alertService: AlertService
  ) {
    let id = localStorage.getItem('id');
    if(id != undefined && localStorage.getItem(id) != undefined) {
      this.id = id;
    }
  }

  login(id, hub) {
    let json = JSON.stringify({"devicetype": "shine#web"});
    return this.http.post(`http://${hub}/api`, json)
      .map((response: Response) => {
        let current = localStorage.getItem(id);

        if(this.id === id && this.id != undefined) {
          return this.getEndpoint();
        }

        let resp = response.json()[0]
        if("error" in resp) {
          throw new Error(resp.error.description);
        }

        if("success" in resp) {
          let user = resp.success.username;
          localStorage.setItem(id, `http://${hub}/api/${user}`);
          localStorage.setItem('id', id)
          this.id = id;
          return this.getEndpoint();
        }

        throw new Error(`Could not parse response from server: ${resp.stringify}`);
      }
    );
  }

  logout(id) {
    localStorage.removeItem(id);
    delete this.id;
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
    let endpoint = localStorage.getItem(this.id);
    if(endpoint) {
      return endpoint;
    }
    this.id = null;
    this.router.navigate(['/hubs']);
  }

  isConnected() {
    if(this.id === undefined) {
      return false
    }
    return true
  }
}
