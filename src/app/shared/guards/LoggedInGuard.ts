import { UserService } from './../services/internal/user/user.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Injectable()
export class LoggedInGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) { }

    canActivate() {
        console.log('LoggedInGuard');
        if (this.userService.getActiveToken('token')) {
            console.log(this.userService.getActiveToken('token'));
            this.router.navigate(['Artists']);
            return false;
        } else {
            return true;
        }
    }


}
