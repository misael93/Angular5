import { UserService } from './../services/internal/user/user.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Injectable()
export class GuestGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) { }

    canActivate() {
        console.log('GuestGuard');
        if (!this.userService.getActiveToken('token')) {
            this.router.navigate(['Login']);
            return false;
        } else {
            return true;
        }
    }


}
