import { EditArtistParams } from './../../../models/EditArtistParams';
import { ArtistResponse } from './../../../models/ArtistResponse';
import { ArtistParams } from './../../../models/ArtistParams';
import { Constant } from './../../../classes/Constant';
import { Artist } from './../../../models/Artist';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ArtistService {

  constructor(private _http: Http) { }

  GetArtists(): Observable<[Artist]> {
    return this._http.get(Constant.API + 'artists', Constant.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  AddArtist(body: ArtistParams): Observable<ArtistResponse> {
    return this._http.post(Constant.API + 'artists', body, Constant.options)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error) || 'Server error');
  }

  GetArtist(identifier: String): Observable<ArtistResponse> {
    return this._http.get(Constant.API + 'artists/' + identifier, Constant.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error) || 'Server error');
  }

  EditArtist(body: EditArtistParams): Observable<ArtistResponse> {
    return this._http.put(Constant.API + 'artists/' + body.identifier, body, Constant.options)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error) || 'Server error');
  }

}
