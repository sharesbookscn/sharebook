import {NgModule, ANALYZE_FOR_ENTRY_COMPONENTS}             from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { MainPageModule ,MainPageComponent}   from './main/main.page';
import { LoginPageModule ,LoginPageComponent}   from './login/login.page';
import { RegisterPageModule , RegisterPageComponent}   from './register';


export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent},
    {path: 'main', component: MainPageComponent},
    {path: 'register', component: RegisterPageComponent},
];

function provideRoutes(routes) {
    return [
        {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: routes, multi: true}
    ];
}

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true}),LoginPageModule,MainPageModule,RegisterPageModule],
    exports: [RouterModule],
    providers: [provideRoutes(routes)]
})
export class AppRoutingModule {
}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */