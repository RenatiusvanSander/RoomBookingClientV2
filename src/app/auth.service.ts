import { EventEmitter, Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();
  
  constructor(private dataService: DataService) {
  }

  authenticate(name: string, password: string) {
    this.dataService.validateUser(name, password).subscribe(
      next => {
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(true);
      },
      error => {
        this.isAuthenticated = false;
        this.authenticationResultEvent.emit(false);
      }
    );
  }

  getRole(): string | null {
    /*
    if(this.jwtToken == null) {
      return null;
    }

    const encodedPAyload = this.jwtToken.split('.')[1];
    const payload = atob(encodedPAyload);
    return JSON.parse(payload).role;
    */
   return 'ADMIN';
  }
}
