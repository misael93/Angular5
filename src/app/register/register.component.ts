import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router } from '../../../node_modules/@angular/router';
import { Register } from '../shared/models/Register';
import { RegisterParams } from '../shared/models/RegisterParams';
import { RegisterService } from '../shared/services/external/register/register.service';
import { UserService } from '../shared/services/internal/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm: FormGroup;
  message: String;
  error: boolean;

  constructor(
    private _registerService: RegisterService,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'name': new FormControl(
        '',
        [Validators.required]
      ),
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
      // Construct the object to send.
      const register: RegisterParams = {
        email: this.loginForm.get('email').value,
        name: this.loginForm.get('name').value,
        password: this.loginForm.get('password').value
      };
      // Make call using simulated API
      // let response: Register;
      // response = this._registerService.Register(register);
      // console.log(response);
      // if (response.result === true) {
      //   if (this._userService.setActiveToken(response.token)) {
      //     this._router.navigate(['/Login']);
      //   }
      // }
      // Make call using live API
      let response: Observable<Register>;
      response = this._registerService.Register(register);
      response.subscribe(
        (data) => {
          console.log(data);
          if (data.token) {
            // Save in user service.
            if (this._userService.setActiveToken(data.token)) {
              // Do redirect
              this._router.navigate(['/Artists']);
            }
          }
        },
        (error) => {
          this.error = true;
          this.message = JSON.parse(error._body).error;
          console.log(error);
        }
      );
    } else {
      this.error = true;
      this.message = 'Invalid form';
    }
  }

  goToLogin = () => {
    this._router.navigate(['/Login']);
  }

}
