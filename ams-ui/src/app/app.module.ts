import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


//components
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavComponent } from './components/signup/nav/nav.component';

//material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';

import { MatSidenavModule } from '@angular/material/sidenav';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginnavComponent } from './components/login/loginnav/loginnav.component';
import { AssetsComponent } from './components/assets/assets.component';
import { ArchivesComponent } from './components/archives/archives.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { AddAssetDialogComponent } from './components/assets/add-asset-dialog/add-asset-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavComponent,
    LoginnavComponent,
    AssetsComponent,
    ArchivesComponent,
    TopNavComponent,
    AddAssetDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,

    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    MatSnackBarModule,

    MatSidenavModule,
    MatDialogModule,
    MatSelectModule




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
