import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Constant } from '../../../classes/Constant';
import { RegisterParams } from '../../../models/RegisterParams';
import { Register } from '../../../models/Register';

@Injectable()
export class RegisterService {

  constructor(
    private _http: Http
  ) { }

  /**
   * Call to live API
   * @param body
   */
  Register(body: RegisterParams): Observable<Register> {
    console.log('http request');
    return this._http.post(Constant.API + 'auth/register', body, Constant.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error || 'Server error')); // ...errors if any
  }

  /**
 * Simulated call to API.
 * @param body
 */
  // Register(body: RegisterParams): Register {
  //   const result: Register = {
  //     token: 'AVeryLongTokenForThisUser',
  //     result: true
  //   };
  //   return result;
  // }

}
