import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RoutingModule } from './routing/routing.module';
import { MaterialModule } from '../material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ResumeModule } from './resume/resume.module';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import 'hammerjs';
import { TagModule } from './tag/tag.module';
import { JobModule } from './job/job.module';
import { ErrorPagesModule } from './error-pages/error-pages.module';
import { CardGridComponent } from './shared/card-grid/card-grid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardDetailModule } from './shared/card-detail/card-detail.module';
import { CardEditModule } from './shared/card-edit/card-edit.module';
import { LogoComponent } from './shared/logo.component';
//import { AuthModule } from '@auth0/auth0-angular';
//import { AuthButtonComponent } from './auth.component';
import { UserModule } from './shared/user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    LogoComponent,
//    AuthButtonComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    AppRoutingModule,
    RoutingModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ResumeModule,
    AngularMaterialModule,
    TagModule,
    JobModule,
    ErrorPagesModule,
    FormsModule,
    ReactiveFormsModule,
    CardDetailModule,
    CardEditModule,
    /**AuthModule.forRoot({
      domain: 'dev-4scl802g.us.auth0.com',
      clientId: 'j4C7Ej8UPWZdgUwm2QWwUUClkBZ5bYny'
    }),*/
    UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
