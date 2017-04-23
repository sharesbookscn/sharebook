import {NgModule}       from '@angular/core';
import {HttpModule ,JsonpModule }       from '@angular/http';
import {BrowserModule}  from '@angular/platform-browser';
import {BrowserAnimationsModule}  from '@angular/platform-browser/animations';

/* App Root */
import {AppComponent}   from './app.component';

/* Feature Modules */
import {AppService}       from './app.service';

/* Routing Module */
import {AppRoutingModule} from './app-routing.module';
import {APP_BASE_HREF} from '@angular/common';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,JsonpModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    declarations: [AppComponent],
    providers: [AppService,{provide: APP_BASE_HREF, useValue: '/'}],
    bootstrap: [AppComponent]
})
export class AppModule {
}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */