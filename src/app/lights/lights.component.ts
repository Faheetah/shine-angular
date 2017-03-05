import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';

interface State {
  bri: number
  on?: boolean
  reachable?: boolean
}

interface Light {
  id: number
  name: string
  state?: State
}

@Component({
  templateUrl: './lights.component.html'
})

export class LightsComponent implements OnInit {
  private endpoint: string
  private lights: Light[] = []
  private updating: boolean = false

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
        Object.keys(data).forEach(i => {
          let light = data[i]
          light.id = i
          this.lights.push(light)
        })
      },
      error => { this.alertService.danger(error) }
    )
  }

  trackBy(i, v) {
    return i
  }

  changeBrightness(index: number, value: number) {
    this.lights[index].state = {
        on: +value > 0,
        bri: +value,
        reachable: this.lights[index].state.reachable
      }
    if(this.updating == true) { return }

    this.updating = true

    setTimeout(() => {
      let state: State = this.lights[index].state
      let id: number = this.lights[index].id

      this.http.put(`${this.endpoint}/lights/${id}/state`, JSON.stringify(state)) 
        .map((response: Response) => {
          let data = response.json()
          if('error' in data) {
            throw new Error(data.error)
          }
        })
        .subscribe(
          null,
          error => {
            this.alertService.danger(error)
          }
        )
      this.updating = false },
      350)
  }

  lightStyle(state) {
    if(state.reachable == false) {
      return "red"
    }
    if(state.on == true) {
      return "yellow"
    }
    return "silver"
  }
}
