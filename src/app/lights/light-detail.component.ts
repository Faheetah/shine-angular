import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';


interface State {
  on: boolean,
  bri: number
}

@Component({
  templateUrl: './light-detail.component.html'
})

export class LightDetailComponent implements OnInit {
  private endpoint: string;
  private light: any;

  constructor(
    private http: Http,
    private alertService: AlertService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.endpoint = authService.getEndpoint();
  }

  changeBri(value: number) {
    let on = value > 0 
    let payload: State = { on: on, bri: +value }
    this.http.put(this.endpoint + '/lights/' + this.light.id + '/state', JSON.stringify(payload))
      .map((response: Response) => {
        return response.json()
      })
      .subscribe(
        data => {
          if('error' in data) {
            throw new Error(data.error)
          }
          this.light.state.on = on
          this.light.state.bri = value
        },
        error => { this.alertService.danger(error) }
      )
  }

  getLight(id: string) {
    this.http.get(this.endpoint + '/lights/' + id)
      .map((response: Response) => {
        return response.json()
      })
      .subscribe(
        data => {
          this.light = data
          this.light.id = id
        },
        error => { this.alertService.danger(error) }
      )
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        params => {
          this.getLight(params['id'])
        },
        error => { this.alertService.danger(error) }
      )
  }
}