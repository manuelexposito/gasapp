import { GasolinerasFavoritasComponent } from './../components/gasolineras-favoritas/gasolineras-favoritas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from '../components/shared/sign-in/sign-in.component';
import { GasolineraListComponent } from '../pages/gasolinera-list/gasolinera-list.component';
import { AngularFireAuthGuard, canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToGasolineras = () => redirectLoggedInTo(['gasolineras']);
const routes: Routes = [

  {path:'login',  pathMatch:'full', component:SignInComponent},
  {path: 'gasolinerasFav', component:GasolinerasFavoritasComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path:'gasolineras', component:GasolineraListComponent, ...canActivate(redirectLoggedInToGasolineras), ...canActivate(redirectUnauthorizedToLogin) },
  {path:'', pathMatch:'full', redirectTo:'/login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
