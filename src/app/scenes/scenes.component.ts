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
}

@Component({
  templateUrl: './scenes.component.html',
})

export class ScenesComponent implements OnInit {
  private endpoint: string;
  private scenes: any;
  private lights: {[key: string]: Light} = {}

  constructor(
    private http: Http,
    private alertService: AlertService,
    private authService: AuthService
  ) { 
    this.endpoint = authService.getEndpoint();
  }

  ngOnInit() {
    this.getLights()
    this.getScenes()
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

  getScenes() {
    this.http.get(this.endpoint + '/scenes')
      .subscribe(
      (response: Response) => {
        let data = response.json()
        Object.keys(data).forEach(scene => {
          let lights: {[key: string]: Light} = {}
          // probably better to abstract this out into a method to get all lights for a group
          Object.keys(data[scene].lights).forEach(light => {
            lights[data[scene].lights[light]] = this.lights[data[scene].lights[light]]
          })
          data[scene].lights = lights
        })
        this.scenes = data;
      },
      error => {
        this.alertService.danger(error)
      }
    )
  }

  deleteScene(index: number) {
    // if(!confirm('Really remove this scene?')) {
      // return
    // }
    this.http.delete(`${this.endpoint}/scenes/${index}`)
      .map((response: Response) => {
        let data = response.json()
        if('error' in data) {
          throw new Error(data.error)
        }
      })
      .subscribe(
        () => {
          this.alertService.danger(`Removed scene ${this.scenes[index]['name']}`)
          this.getScenes()
        },
        error => {
          this.alertService.danger(error)
        }
      )
  }


  saveScene(index: string) {
    let scene = {}
    scene['name'] = this.scenes[index]['name']
    scene['lights'] = Object.keys(this.scenes[index]['lights'])
    // scene['storelightstate'] = true

    this.http.put(`${this.endpoint}/scenes/${index}`, JSON.stringify(scene))
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
          this.alertService.success(`Updated scene ${this.scenes[index]['name']}`)
          this.getScenes()
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
