import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';

@Component({
  templateUrl: './hubs.component.html'
})

export class HubsComponent implements OnInit {
  loading: boolean = false;
  returnUrl: string;
  hubs: {"id": string, "internalipaddress": string}[]

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loading = true;
    this.authService.getUpnpHubs()
      .subscribe(
        data => {
          this.hubs = data.json();
          if(this.hubs.length === 1) {
            this.login(this.hubs[0].id, this.hubs[0].internalipaddress);
          }
          this.loading = false;
          this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
        },
        error => {
          this.alertService.danger('Could not get hub from Philips, please visit https://www.meethue.com/api/nupnp to get your hub IP, or check your router.')
          this.loading = false;
        }
      ) 
  }

  login(id, hub) {
    this.authService.login(id, hub)
      .subscribe(
        data => {
          this.alertService.clear();
          this.alertService.success(`Connected to ${hub}`, true)
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(111)
          this.alertService.danger(error) 
        }
      )
  }

  logout(id) {
    this.authService.logout(id);
  }
}
