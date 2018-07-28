import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/* in order to use the [(ngModel)] 2-way data binding attributed with html tags*/
/* we need to import the forms "library" Module in which it lives */
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [   /* list of Components (classes or objects) used by our app */
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  imports: [        /* declare all "EXTERNAL" imports e.g. FormsModule that the app needs to use */
    BrowserModule,  /* don't forget the comma for multiple imports declarations */
    /* Having imported FormsModule from '@angular/forms' */
    /* We still need to say here that this import was done */
    FormsModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
