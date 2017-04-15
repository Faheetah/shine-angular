import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormBuilder, FormGroup } from '@angular/forms';

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
}

interface Group {
  name: string
  type: string
  lights: [string, Light]
  action?: State
  expanded?: boolean
}

@Component({
  templateUrl: './rooms.component.html'
})

export class RoomsComponent implements OnInit {
  private endpoint: string
  private lights: {[key: string]: Light} = {}
  private groups: [string, Group]
  private updating: boolean = false

  private classes: [string] = [
    "Living room",
    "Kitchen",
    "Dining",
    "Bedroom",
    "Kids bedroom",
    "Bathroom",
    "Nursery",
    "Recreation",
    "Office",
    "Gym",
    "Hallway",
    "Toilet",
    "Front door",
    "Garage",
    "Terrace",
    "Garden",
    "Driveway",
    "Carport",
    "Other"
  ]

  constructor(
    private http: Http,
    private alertService: AlertService,
    private authService: AuthService
  ) { 
    this.endpoint = authService.getEndpoint();
  }

  ngOnInit() {
    this.getLights()
    this.getGroups()
  }

  getGroups() {
    this.http.get(`${this.endpoint}/groups`)
      .subscribe(
      (response: Response) => {
        let data = response.json()
        Object.keys(data).forEach(group => {
          let lights: {[key: string]: Light} = {}
          // probably better to abstract this out into a method to get all lights for a group
          Object.keys(data[group].lights).forEach(light => {
            lights[data[group].lights[light]] = this.lights[data[group].lights[light]]
          })
          data[group].lights = lights
          
          if(!data[group].action.on) {
            data[group].action.bri = 0
          }
        })
        this.groups = data
      },
      error => { 
        this.alertService.danger(error) 
      }
    )
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
    this.groups[index]['action'] = {
        on: +value > 0,
        bri: +value,
      }
    if(this.updating == true) { return }

    this.updating = true

    setTimeout(() => {
      let state: State = this.groups[index]['action']

      this.http.put(`${this.endpoint}/groups/${index}/action`, JSON.stringify(state)) 
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
    if(state.on) {
      let bri = Math.floor(state.bri / 3) + 150
      return `rgb(${bri}, ${bri}, 100)`
    }
    return "rgb(80,80,80)"
  }

  toggleOn(index: number) {
    if(this.groups[index]['action'].on) {
      this.changeBrightness(index, 0)
    } else {
      this.changeBrightness(index, 254)
    }
  }

  toggleMenu(index: number) {
    let expanded = this.groups[index]['expanded']

    Object.keys(this.groups).forEach(g => {
      this.groups[g]['expanded'] = false
    })

    if(!expanded) {
      this.groups[index]['expanded'] = true
    }
  }

  renameGroup(index: number) {
    let name = prompt('New name:')
    if(!name) {
      return
    }
    this.http.put(`${this.endpoint}/groups/${index}`, JSON.stringify({name: name}))
      .map((response: Response) => {
        let data = response.json()
        if('error' in data) {
          throw new Error(data.error)
        }
      })
      .subscribe(
        () => {
          this.groups[index]['name'] = name
          this.groups[index]['expanded'] = false
        },
        error => {
          this.alertService.danger(error)
        }
      )
  }

  deleteGroup(index: number) {
    if(!confirm('Really remove this group?')) {
      return
    }
    this.http.delete(`${this.endpoint}/groups/${index}`)
      .map((response: Response) => {
        let data = response.json()
        if('error' in data) {
          throw new Error(data.error)
        }
      })
      .subscribe(
        () => {
          this.alertService.danger(`Removed group ${this.groups[index]['name']}`)
          this.getGroups()
        },
        error => {
          this.alertService.danger(error)
        }
      )
  }

  assignedToRoom(index: string) {
    for(var g in this.groups) {
      if(g == index || this.groups[g]['type'] != 'Room') {
        continue
      }

      for(var l in this.groups[g]['lights']) {
        if(l in this.groups[index]['lights']) {
          this.alertService.danger(`Light "${this.lights[l]['name']}" is already in room "${this.groups[g]['name']}"`)
          return true
        }
      }
    }
    return false
  }

  saveGroup(index: string) {
    let group = {}
    group['name'] = this.groups[index]['name']
    group['class'] = this.groups[index]['class']
    group['lights'] = Object.keys(this.groups[index]['lights'])

    if(this.assignedToRoom(index)) {
      return
    }
  
    this.http.put(`${this.endpoint}/groups/${index}`, JSON.stringify(group))
      .map((response: Response) => {
        let data = response.json()
        data.forEach(msg => {
            if('error' in msg) {
              throw new Error(msg['error']['description'])
            }
          }
        )
      })
      .subscribe(
        () => {
          this.alertService.success(`Updated group ${this.groups[index]['name']}`)
          this.getGroups()
        },
        error => {
          this.alertService.danger(error)
        }
      )
  }

  delete(obj: any, key: string) {
    delete obj[key]
  }
}
