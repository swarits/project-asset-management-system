import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AssetsComponent } from './components/assets/assets.component';
import { ArchivesComponent } from './components/archives/archives.component';
import { AuthGuardService } from './auth-guard.service';


const routes: Routes = [

  {path: '', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'assets', component: AssetsComponent, canActivate: [AuthGuardService]},
  {path: 'archives', component: ArchivesComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
