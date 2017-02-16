import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http'

import { AuthService } from '../auth.service';

@Component({
  templateUrl: './lights.component.html'
})
export class LightsComponent implements OnInit {
  private endpoint: string;
  private lights: any;

  constructor(
    private http: Http,
    private authService: AuthService
  ) { 
    this.endpoint = authService.getEndpoint();
  }

  ngOnInit() {
    this.http.get(this.endpoint + '/lights')
      .map((response: Response) => {
        return response.json()
      }
    ).subscribe(
      data => {
        console.log(data)
        this.lights = Object.keys(data)
          .map(k => { return {key: k, value: data[k]} });
      },
      error => { console.log(error) }
    )
  }



}
