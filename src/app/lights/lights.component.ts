import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';

@Component({
  templateUrl: './lights.component.html'
})

export class LightsComponent implements OnInit {
  private endpoint: string;
  private lights: any;

  constructor(
    private http: Http,
    private alertService: AlertService,
    private authService: AuthService
  ) { 
    this.endpoint = authService.getEndpoint();
  }

  ngOnInit() {
    this.http.get(this.endpoint + '/lights')
      .map((response: Response) => {
        return response.json()
      })
      .subscribe(
      data => {
        this.lights = data;
      },
      error => { this.alertService.danger(error) }
    )
  }
}
