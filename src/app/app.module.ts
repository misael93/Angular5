import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AddAlbumComponent } from './album/add-album/add-album.component';
import { AlbumComponent } from './album/album.component';
import { EditAlbumComponent } from './album/edit-album/edit-album.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddArtistComponent } from './artist/add-artist/add-artist.component';
import { ArtistComponent } from './artist/artist.component';
import { EditArtistComponent } from './artist/edit-artist/edit-artist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AlbumService } from './shared/services/external/album/album.service';
import { ArtistService } from './shared/services/external/artist/artist.service';
import { LoginService } from './shared/services/external/login/login.service';
import { RegisterService } from './shared/services/external/register/register.service';
import { SongService } from './shared/services/external/song/song.service';
import { UserService } from './shared/services/internal/user/user.service';
import { AddSongComponent } from './song/add-song/add-song.component';
import { EditSongComponent } from './song/edit-song/edit-song.component';
import { SongComponent } from './song/song.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { UserComponent } from './user/user.component';
import { LoggedInGuard } from './shared/guards/LoggedInGuard';
import { GuestGuard } from './shared/guards/GuestGuard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AlbumComponent,
    AddAlbumComponent,
    EditAlbumComponent,
    SongComponent,
    AddSongComponent,
    EditSongComponent,
    ArtistComponent,
    AddArtistComponent,
    EditArtistComponent,
    UserComponent,
    AddUserComponent,
    EditUserComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  providers: [
    LoginService,
    AlbumService,
    RegisterService,
    UserService,
    ArtistService,
    SongService,
    LoggedInGuard,
    GuestGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
