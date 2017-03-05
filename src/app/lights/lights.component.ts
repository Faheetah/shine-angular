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
  expanded?: boolean
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
          if(light.state.on == false) {
            light.state.bri = 0
          }
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
      return "#FF3333"
    }
    if(state.on == true) {
      let bri = Math.floor(state.bri / 3) + 150
      console.log(bri)
      return `rgb(${bri}, ${bri}, 100)`
    }
    return "rgb(80,80,80)"
  }

  toggle(index: number) {
    this.lights[index].expanded = !this.lights[index].expanded
  }

  rename(index: number) {
    let name = prompt('New name:')
    if(!name) {
      return
    }
    this.http.put(`${this.endpoint}/lights/${this.lights[index].id}`, JSON.stringify({name: name}))
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
    this.http.delete(`${this.endpoint}/lights/${this.lights[index].id}`)
      .map((response: Response) => {
        let data = response.json()
        if('error' in data) {
          throw new Error(data.error)
        }
      })
      .subscribe(
        () => {
          this.alertService.danger(`Removed light ${this.lights[index].name}`)
          this.lights.splice(index, 1)
        },
        error => {
          this.alertService.danger(error)
        }
      )
  }
}
