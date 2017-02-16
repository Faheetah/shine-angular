import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private clearSubject = new Subject<any>();
  private persist = false;

  constructor(private router: Router) { 
    router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        if(this.persist) {
          this.persist = false;
        } else {
          this.clear();
        }
      }
    })
  }

  alert(message: string, type: string = 'warning') {
    this.subject.next({type: type, message: message});
  }

  info(message: string, persist = false) {
    this.persist = persist;
    this.alert(message, 'info');
  }

  success(message: string, persist = false) {
    this.persist = persist;
    this.alert(message, 'success');
  }

  warning(message: string, persist = false) {
    this.persist = persist;
    this.alert(message, 'warning');
  }

  danger(message: string, persist = false) {
    this.persist = persist;
    this.alert(message, 'danger');
  }

  clear() {
    this.clearSubject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  shouldClear(): Observable<any> {
    return this.clearSubject.asObservable();
  }
}
