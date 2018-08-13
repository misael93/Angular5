import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/services/internal/user/user.service';
import { LoginService } from './../shared/services/external/login/login.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '../../../node_modules/@angular/router';
import { Login } from '../shared/models/Login';
import { LoginParams } from '../shared/models/LoginParams';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: boolean;
  message: String;

  constructor(
    private _loginService: LoginService,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    // console.log('LOGIN COMPONENT', this._userService.getActiveToken('token'));
    this.loginForm = new FormGroup({
      'email': new FormControl(
        '',
        [Validators.required, Validators.email]
      ),
      'password': new FormControl(
        '',
        [Validators.required]
      )
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const login: LoginParams = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value
      };

      // Make call to API
      let response: Observable<Login>;
      response = this._loginService.Login(login);
      response.subscribe(
        (data) => {
          console.log(data);
          if (data.token) {
            // Save token in user service
            if (this._userService.setActiveToken(data.token)) {
              // Do redirect
              this._router.navigate(['/Artists']);
            }
          } else {
            this.error = true;
            this.message = data.message;
          }
        },
        (error) => {
          console.log(error);
        }
      );

    } else {
      console.log(this.loginForm);
      this.error = true;
      this.message = 'Invalid form';
    }
  }

  goToRegister = () => {
    this._router.navigateByUrl('Register');
  }

}
