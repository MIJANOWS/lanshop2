import { UserService } from '../../shared/services/user.service';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from '../../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate():Observable<boolean>{
    return this.auth.appUser$.map(appUser=>appUser.isAdmin);
  }
}
