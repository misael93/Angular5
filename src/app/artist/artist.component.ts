import { ArtistService } from './../shared/services/external/artist/artist.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Artist } from '../shared/models/Artist';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artists: [Artist];

  constructor(private _artistService: ArtistService, private _router: Router) { }

  ngOnInit() {

    let response: Observable<[Artist]>;
    response = this._artistService.GetArtists();
    response.subscribe(
      (data) => {
        if (Object.prototype.toString.call(data) === '[object Array]') {
          this.artists = data;
        } else {
          console.log('This is not supposed to happen');
        }
      },
      (error) => {
        console.log(error);
      }
    );

  }

  btnAddArtist = () => {
    this._router.navigate(['/Artists/create']);
  }

  btnEditArtist = (identifier) => {
    this._router.navigate(['/Artists/edit/' + identifier]);
  }

}
