import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateComponent} from './pages/create/create.component'
import { CreateEventComponent }from './pages/create-event/create-event.component';
import { HomeComponent } from './pages/home/home.component';
import { EventComponent } from './pages/event/event.component';
import { MatSidenavModule } from "@angular/material/sidenav";
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { LoginComponent } from './pages/login/login.component';
import { MatToolbarModule} from "@angular/material/toolbar";
import { MatButtonModule} from "@angular/material/button";
import { MatGridListModule} from "@angular/material/grid-list";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDividerModule } from "@angular/material/divider";
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { RegisterComponent } from './pages/register/register.component';
import { MatTabsModule } from '@angular/material/tabs';
import { authInterceptorProviders } from "./helpers/auth.interceptor";
import { EventLocationComponent } from './pages/event-location/event-location.component';
import { OrganizerProfileComponent } from './pages/organizer-profile/organizer-profile.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventComponent,
    NavBarComponent,
    LoginComponent,
    CreateEventComponent,
    CreateComponent,
    UserProfileComponent,
    RegisterComponent,
    EventLocationComponent,
    OrganizerProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCtz7v_IiSCZxQwE0Fz6vtfuXFjseNXAJY'
    }),
  ],
  providers: [
    authInterceptorProviders,
    MatDatepickerModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
