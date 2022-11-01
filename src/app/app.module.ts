import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './structure/home/home.component';
import { HeaderComponent } from './structure/header/header.component';
import { FooterComponent } from './structure/footer/footer.component';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { FormsModule } from '@angular/forms';
import { LessonsComponent } from './features/lessons/lessons.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    UserComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LessonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
