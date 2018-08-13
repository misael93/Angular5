import { AddArtistComponent } from './artist/add-artist/add-artist.component';
import { ArtistComponent } from './artist/artist.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoggedInGuard } from './shared/guards/LoggedInGuard';
import { GuestGuard } from './shared/guards/GuestGuard';
import { EditArtistComponent } from './artist/edit-artist/edit-artist.component';

const routes: Routes = [
  /* LOGIN */
  {
    path: 'Login',
    component: LoginComponent,
    canActivate: [LoggedInGuard]
  },
  { path: 'login', redirectTo: 'Login', pathMatch: 'full' },
  /* REGISTER */
  {
    path: 'Register',
    component: RegisterComponent,
    canActivate: [LoggedInGuard]
  },
  { path: 'register', redirectTo: 'Register', pathMatch: 'full' },
  // Artists
  {
    path: 'Artists',
    component: ArtistComponent,
    canActivate: [GuestGuard]
  },
  { path: 'artists', redirectTo: 'Artists', pathMatch: 'full' },
  {
    path: 'Artists/create',
    component: AddArtistComponent,
    pathMatch: 'full',
    canActivate: [GuestGuard]
  },
  {
    path: 'Artists/edit/:identifier',
    component: EditArtistComponent,
    pathMatch: 'full',
    canActivate: [GuestGuard]
  },
  { path: '', redirectTo: 'Artists', pathMatch: 'full' },
  /* DEFAULT */
  { path: '**', redirectTo: 'Login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
