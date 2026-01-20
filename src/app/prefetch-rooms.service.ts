import { Injectable } from '@angular/core';
import { Room } from './model/room';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataService } from './data.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PrefetchRoomsService implements Resolve<Observable<Array<Room>>> {

  constructor(private dataService: DataService, private authService: AuthService) { }

  resolve() {
    return this.dataService.getRooms();
  }
}
