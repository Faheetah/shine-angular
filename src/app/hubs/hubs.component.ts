import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-hubs',
  templateUrl: './hubs.component.html',
})

export class HubsComponent implements OnInit {
  loading: boolean = false;
  returnUrl: string;
  hubs: {"id": string, "internalipaddress": string}[]

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loading = true;
    this.authService.getUpnpHubs()
      .subscribe(
        data => {
          this.hubs = data.json();
          this.loading = false;
        },
        error => {
          console.log(error);
          this.loading = false;
        }
      ) 
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  login(id, hub) {
    this.authService.login(id, hub)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error)
        }
      )
  }
}
