import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';

@Component({
  templateUrl: './rooms.component.html',
})

export class RoomsComponent implements OnInit {
  private endpoint: string;
  private rooms: any;

  constructor(
    private http: Http,
    private alertService: AlertService,
    private authService: AuthService
  ) { 
    this.endpoint = authService.getEndpoint();
  }

  ngOnInit() {
    this.http.get(this.endpoint + '/groups')
      .map((response: Response) => {
        return response.json()
      })
      .subscribe(
        data => {
          console.log(data)
          this.rooms = data;
        },
        error => { this.alertService.danger(error) }
      )
  }

}
