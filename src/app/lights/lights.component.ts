import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';

interface State {
  bri: number;
  on?: boolean;
  reachable?: boolean;
}

interface Light {
  id: number;
  name: string;
  state?: State;
  expanded?: boolean;
}

interface Group {
  name: string;
  type: string;
  lights: [string, Light];
}

@Component({
  templateUrl: './lights.component.html'
})

export class LightsComponent implements OnInit {
  private endpoint: string;
  private lights: Light[] = [];
  private groups: [string, Group];
  private updating: boolean = false;

  constructor(
    private http: Http,
    private alertService: AlertService,
    private authService: AuthService
  ) {
    this.endpoint = authService.getEndpoint();
  }

  ngOnInit() {
    this.getLights();
  }

  getLights() {
    this.http.get(`${this.endpoint}/lights`)
      .subscribe(
      (response: Response) => {
        const data = response.json();
        Object.keys(data).forEach(i => {
          const light = data[i];
          if (!light.state.on) {
            light.state.bri = 0;
          }
          light.id = i;
          this.lights.push(light);
        });
      },
      error => {
        this.alertService.danger(error);
      }
    );
  }

  changeBrightness(light: Light, value: number) {
    light.state = {
        on: +value > 0,
        bri: +value,
        reachable: light.state.reachable
      };
    if (this.updating === true) { return; }

    this.updating = true;

    setTimeout(() => {
      const state: State = light.state;

      this.http.put(`${this.endpoint}/lights/${light.id}/state`, JSON.stringify(state))
        .map((response: Response) => {
          const data = response.json();
          if ('error' in data) {
            throw new Error(data.error);
          }
        })
        .subscribe(
          null,
          error => {
            this.alertService.danger(error);
          }
        );
      this.updating = false; },
      350);
  }

  lightStyle(state: State) {
    if (!state.reachable) {
      return '#FF3333';
    }
    if (state.on) {
      const bri = Math.floor(state.bri / 3) + 150;
      return `rgb(${bri}, ${bri}, 100)`;
    }
    return 'rgb(80,80,80)';
  }

  toggleOn(light: Light) {
    if (light.state.on) {
      this.changeBrightness(light, 0);
    } else {
      this.changeBrightness(light, 254);
    }
  }

  toggleMenu(light: Light) {
    const expanded = light['expanded']; //this.lights[index]['expanded'];

    Object.keys(this.lights).forEach(l => {
      this.lights[l]['expanded'] = false;
    });

    if (!expanded) {
      light['expanded'] = true;
    }
  }

  rename(light: Light) {
    const name = prompt('New name:');
    if (!name) {
      return;
    }
    this.http.put(`${this.endpoint}/lights/${light.id}`, JSON.stringify({name: name}))
      .map((response: Response) => {
        const data = response.json();
        if ('error' in data) {
          throw new Error(data.error);
        }
      })
      .subscribe(
        () => {
          light.name = name;
          light.expanded = false;
        },
        error => {
          this.alertService.danger(error);
        }
      );
  }

  delete(light: Light) {
    if (!confirm('Really remove this light?')) {
      return;
    }
    this.http.delete(`${this.endpoint}/lights/${light.id}`)
      .map((response: Response) => {
        const data = response.json();
        if ('error' in data) {
          throw new Error(data.error);
        }
      })
      .subscribe(
        () => {
          this.alertService.danger(`Removed light ${light.name}`);
          this.getLights();
        },
        error => {
          this.alertService.danger(error);
        }
      );
  }

  search() {
    this.http.post(`${this.endpoint}/lights`, {})
      .map((response: Response) => {
        const data = response.json();
        if ('error' in data) {
          throw new Error(data.error);
        }
      })
      .subscribe(
        () => {
          this.alertService.info('Searching for new lights');
        },
        error => {
          this.alertService.danger(error);
        }
      );
  }
}
