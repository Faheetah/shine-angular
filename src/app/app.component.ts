import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent { 
  constructor(private authService: AuthService) { }

  connected() {
    return this.authService.isConnected()
  }
}
