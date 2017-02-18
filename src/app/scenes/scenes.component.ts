import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';

@Component({
  templateUrl: './scenes.component.html',
})

export class ScenesComponent implements OnInit {
  private endpoint: string;
  private scenes: any;

  constructor(
    private http: Http,
    private alertService: AlertService,
    private authService: AuthService
  ) { 
    this.endpoint = authService.getEndpoint();
  }

  ngOnInit() {
    this.http.get(this.endpoint + '/scenes')
      .map((response: Response) => {
        return response.json()
      })
      .subscribe(
        data => {
          this.scenes = data;
        },
        error => { this.alertService.danger(error) }
      )
  }

}
