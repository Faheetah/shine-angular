import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';

@Component({
  templateUrl: './schedules.component.html',
})

export class SchedulesComponent implements OnInit {
  private endpoint: string;
  private schedules: any;

  constructor(
    private http: Http,
    private alertService: AlertService,
    private authService: AuthService
  ) { 
    this.endpoint = authService.getEndpoint();
  }

  ngOnInit() {
    this.http.get(this.endpoint + '/schedules')
      .map((response: Response) => {
        return response.json()
      })
      .subscribe(
        data => {
          this.schedules = Object.keys(data)
            .map(k => { return {key: k, value: data[k]} })
        },
        error => { this.alertService.danger(error) }
      )
  }

}
