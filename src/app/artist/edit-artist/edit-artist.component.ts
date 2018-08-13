import { UserService } from './../../shared/services/internal/user/user.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ArtistService } from './../../shared/services/external/artist/artist.service';
import { Component, OnInit } from '@angular/core';
import { Artist } from '../../shared/models/Artist';
import { Observable } from '../../../../node_modules/rxjs/Observable';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { ArtistResponse } from '../../shared/models/ArtistResponse';
import { EditArtistParams } from '../../shared/models/EditArtistParams';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.css']
})
export class EditArtistComponent implements OnInit {

  artist: Artist;
  identifier: String;
  message: String;
  artistFound: boolean;
  error: boolean;


  editArtistForm: FormGroup;
  editArtistParams: EditArtistParams;

  constructor(
    private _artistService: ArtistService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _userService: UserService) {

    this._route.params.subscribe((params) => {
      this.identifier = params['identifier'];
    });

  }

  ngOnInit() {
    let response: Observable<ArtistResponse>;
    response = this._artistService.GetArtist(this.identifier);
    response.subscribe(
      (data) => {
        this.artistFound = true;
        this.artist = data.artist;

        // Create form
        this.editArtistForm = this._formBuilder.group({
          name: [this.artist.name, Validators.required],
          genres: this._formBuilder.array(
            this.populateGenres(this.artist.genres)
          ),
          images: this._formBuilder.array(
            this.populateImages(this.artist.images)
          )
        });

      },
      (error) => {
        if (error.status === 404) {
          this.artistFound = false;
          this.message = JSON.parse(error._body).error;
        }
      }
    );
  }

  populateGenres(genres: String[]) {
    const formGroups = [];
    for (let i = 0; i < genres.length; i++) {
      formGroups.push(this.addGenreForm(genres[i]));
    }
    return formGroups;
  }

  populateImages(images: String[]) {
    const formGroups = [];
    for (let i = 0; i < images.length; i++) {
      formGroups.push(this.addImageURLForm(images[i]));
    }
    return formGroups;
  }

  addGenreForm(genre?: String): FormGroup {
    if (!genre) {
      genre = '';
    }
    return this._formBuilder.group({
      genre: [genre, Validators.required]
    });
  }

  addGenreTemplate(): void {
    const control = <FormArray>this.editArtistForm.get('genres');
    control.push(this.addGenreForm());
  }

  removeGenreTemplate(i: number): void {
    const control = <FormArray>this.editArtistForm.get('genres');
    control.removeAt(i);
  }

  addImageURLForm(image?: String): FormGroup {
    let stored = true;
    if (!image) {
      image = '';
      stored = false;
    }
    return this._formBuilder.group({
      image: [image, Validators.required],
      alreadyStored: [stored]
    });
  }

  addImageURLTemplate(): void {
    const control = <FormArray>this.editArtistForm.get('images');
    control.push(this.addImageURLForm());
  }

  removeImageURLTemplate(i: number) {
    const control = <FormArray>this.editArtistForm.get('images');
    control.removeAt(i);
  }

  onSubmit() {

    if (!this._userService.getActiveToken('token')) {
      this._router.navigate(['/Login']);
    } else if (this.editArtistForm.valid) {

      // Get the genres if any
      const genres = this.editArtistForm
        .get('genres')
        .value
        .map(x => x.genre);

      const images = this.editArtistForm
        .get('images')
        .value
        .map(x => x.image);

      // // // Object to send
      const artist: EditArtistParams = {
        identifier: this.identifier,
        name: this.editArtistForm.get('name').value,
        genres: genres,
        images: images
      };
      // Make request to API
      let response: Observable<ArtistResponse>;
      response = this._artistService.EditArtist(artist);
      response.subscribe(
        (data) => {
          console.log(data);
          // If successfully edited
          if (data.artist) {
            this.error = false;
            this.message = data.message;
            this._router.navigate(['/Artists/edit/' + data.artist.identifier]);
          } else {
            console.log(data);
          }
        },
        (error) => {
          this.error = true;
          this.message = JSON.parse(error._body).error;
          console.log(error);
        }
      );
    } else {
      console.log('invalid form');
      this.error = true;
      this.message = 'Invalid form';
    }
  }

  goBack = () => {
    this._router.navigate(['/Artists']);
  }

}
