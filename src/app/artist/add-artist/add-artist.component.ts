import { UserService } from './../../shared/services/internal/user/user.service';
import { ArtistResponse } from './../../shared/models/ArtistResponse';
import { Observable } from 'rxjs/Observable';
import { ArtistService } from './../../shared/services/external/artist/artist.service';
import { ArtistParams } from './../../shared/models/ArtistParams';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.css']
})
export class AddArtistComponent implements OnInit {

  addArtistForm: FormGroup;
  message: String;
  error: boolean;

  constructor(
    private _artistService: ArtistService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.addArtistForm = this._formBuilder.group({
      name: ['', Validators.required],
      genres: this._formBuilder.array([
        this.addGenreForm()
      ]),
      images: this._formBuilder.array([
        this.addImageURLForm()
      ])
    });
  }

  addGenreForm(): FormGroup {
    return this._formBuilder.group({
      genre: ['', Validators.required]
    });
  }

  addGenreTemplate(): void {
    const control = <FormArray>this.addArtistForm.get('genres');
    control.push(this.addGenreForm());
  }

  removeGenreTemplate(i: number): void {
    const control = <FormArray>this.addArtistForm.get('genres');
    control.removeAt(i);
  }

  addImageURLForm(): FormGroup {
    return this._formBuilder.group({
      image: ['', Validators.required]
    });
  }

  addImageURLTemplate(): void {
    const control = <FormArray>this.addArtistForm.get('images');
    control.push(this.addImageURLForm());
  }

  removeImageURLTemplate(i: number) {
    const control = <FormArray>this.addArtistForm.get('images');
    control.removeAt(i);
  }

  onSubmit() {

    if (!this._userService.getActiveToken('token')) {
      this._router.navigate(['/Login']);
    } else if (this.addArtistForm.valid) {

      console.log(this.addArtistForm);

      // Get the genres if any
      const genres = this.addArtistForm
        .get('genres')
        .value
        .map(x => x.genre);

      const images = this.addArtistForm
        .get('images')
        .value
        .map(x => x.image);

      // // // Object to send
      const artist: ArtistParams = {
        name: this.addArtistForm.get('name').value,
        genres: genres,
        images: images
      };
      // Make request to API
      let response: Observable<ArtistResponse>;
      response = this._artistService.AddArtist(artist);
      response.subscribe(
        (data) => {
          // If successfully added
          if (data.artist) {
            this._router.navigate(['/Artists']);
          } else {
            console.log('Something weird...');
          }
        },
        (error) => {
          this.error = true;
          this.message = JSON.parse(error._body).error;
          console.log(error);
        }
      );
    } else {
      console.log(this.addArtistForm);
      this.error = true;
      this.message = 'Invalid form';
    }
  }

  goBack = () => {
    this._router.navigate(['/Artists']);
  }

}
