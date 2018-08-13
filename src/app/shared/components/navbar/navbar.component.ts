import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/internal/user/user.service';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean;

  constructor(private _userService: UserService, private _router: Router) {}

  ngOnInit() {
    if (this._userService.getActiveToken('token')) {
      this.loggedIn = true;
    }
  }

  logout = () => {
    this._userService.removeActiveToken('token');
    this._router.navigate(['/Login']);
  }

}
