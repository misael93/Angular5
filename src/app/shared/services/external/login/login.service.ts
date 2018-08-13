import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Constant } from '../../../classes/Constant';
import { LoginParams } from '../../../models/LoginParams';
import { Login } from '../../../models/Login';

@Injectable()
export class LoginService {

  constructor(private _http: Http) { }

  Login(body: LoginParams): Observable<Login> {
    return this._http.post(Constant.API + 'auth/login', body, Constant.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

}
