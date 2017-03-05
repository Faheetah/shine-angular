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
  name: string
  state?: State
  expanded?: boolean
}

interface Group {
  name: string
  type: string
  lights: [string, Light]
}

@Component({
  templateUrl: './lights.component.html'
})

export class LightsComponent implements OnInit {
  private endpoint: string
  private lights: {[key: string]: Light} = {}
  private groups: [string, Group]
  private updating: boolean = false

  constructor(
    private http: Http,
    private alertService: AlertService,
    private authService: AuthService
  ) { 
    this.endpoint = authService.getEndpoint();
  }

  ngOnInit() {
    this.getLights()
  }

  getLights() {
    this.http.get(`${this.endpoint}/lights`)
      .subscribe(
      (response: Response) => {
        let data = response.json()
        Object.keys(data).forEach(i => {
          let light = data[i]
          if(!light.state.on) {
            light.state.bri = 0
          }
        })
        this.lights = data
      },
      error => { 
        this.alertService.danger(error) 
      }
    )
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

      this.http.put(`${this.endpoint}/lights/${index}/state`, JSON.stringify(state)) 
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

  lightStyle(state: State) {
    if(!state.reachable) {
      return "#FF3333"
    }
    if(state.on) {
      let bri = Math.floor(state.bri / 3) + 150
      return `rgb(${bri}, ${bri}, 100)`
    }
    return "rgb(80,80,80)"
  }

  toggleOn(index: number) {
    if(this.lights[index].state.on) {
      this.changeBrightness(index, 0)
    } else {
      this.changeBrightness(index, 254)
    }
  }

  toggleMenu(index: number) {
    this.lights[index].expanded = !this.lights[index].expanded
  }

  rename(index: number) {
    let name = prompt('New name:')
    if(!name) {
      return
    }
    this.http.put(`${this.endpoint}/lights/${index}`, JSON.stringify({name: name}))
      .map((response: Response) => {
        let data = response.json()
        if('error' in data) {
          throw new Error(data.error)
        }
      })
      .subscribe(
        () => {
          this.lights[index].name = name
          this.lights[index].expanded = false
        },
        error => {
          this.alertService.danger(error)
        }
      )
  }

  delete(index: number) {
    if(!confirm('Really remove this light?')) {
      return
    }
    this.http.delete(`${this.endpoint}/lights/${index}`)
      .map((response: Response) => {
        let data = response.json()
        if('error' in data) {
          throw new Error(data.error)
        }
      })
      .subscribe(
        () => {
          this.alertService.danger(`Removed light ${this.lights[index].name}`)
          this.getLights()
        },
        error => {
          this.alertService.danger(error)
        }
      )
  }
}
