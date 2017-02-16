import { Component, OnInit } from '@angular/core';

import { AlertService } from '../alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})

export class AlertComponent {
  alerts: Array<IAlert> = [];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(
      alert => { 
        if(alert != undefined) {
          this.open(alert.message, alert.type);
        }
      } 
    )

    this.alertService.shouldClear().subscribe(
      clear => {
        this.alerts = [];
      }
    )
  }

  open(message: string, type: string = 'warning') {
    let nextId: number = this.alerts.length
    this.alerts.push({
      id: nextId,
      type: type,
      message: message
    })
  }

  close(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}