import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-hubs',
  templateUrl: './hubs.component.html',
})

export class HubsComponent implements OnInit {
  @Input() hub: string;
  returnUrl: string;
  hubs: {"id": string, "internalipaddress": string}[]

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.hubs = this.authService.getUpnpHubs();
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  login(event) {
    let hub = event.srcElement.innerText;
    this.authService.login(hub)
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
