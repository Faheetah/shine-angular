import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  login(hub) {
    let user = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
    let json = JSON.stringify({"devicetype": "web", "username": user})
    return this.http.post(`http://${hub}/api`, json).map((response) => {
      true;
    });
  }

  getUpnpHubs() {
    return [
      {"id": "1234567890abcdef", "internalipaddress": "localhost:8888"}
    ]
  }
}
