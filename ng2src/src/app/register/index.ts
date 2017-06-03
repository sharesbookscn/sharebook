import { Component, Injectable, ViewContainerRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule, Jsonp } from '@angular/http';
import { MaterialModule, MdSnackBar, MdSnackBarModule, MdSnackBarConfig } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service'

import { RegisterPageComponent}   from './register.page';
export { RegisterPageComponent}   from './register.page';


@NgModule({
    imports: [FormsModule, CommonModule, MaterialModule, HttpModule, JsonpModule],
    declarations: [RegisterPageComponent],
    exports: [RegisterPageComponent],
    providers: [AppService, MdSnackBar],
})
export class RegisterPageModule {
}