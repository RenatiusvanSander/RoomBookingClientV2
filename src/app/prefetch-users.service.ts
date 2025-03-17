import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { User } from './model/user';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrefetchUsersService implements Resolve<Observable<Array<User>>>{

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Observable<User[]>> {
    return this.dataService.getUsers();
  }
}
