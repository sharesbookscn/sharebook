import { Component, Injectable, ViewContainerRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule, Jsonp } from '@angular/http';
import { MaterialModule, MdSnackBar, MdSnackBarModule, MdSnackBarConfig } from '@angular/material';
import { FormsModule } from '@angular/forms';

import './login.page.less'
import { AppService } from '../app.service'
import { Router } from '@angular/router';
import { Observable } from "rxjs";
let md5 = require('blueimp-md5/js/md5.js');

@Component({
    selector: 'login-page',
    template: '' + require('./login.page.html'),
    providers: [MdSnackBar]
})
export class LoginPageComponent {
    userid: any = null;
    password: any = null;
    msg: any = null;
    logining: boolean = false;
    logintext: string;
    logininter: any;
    logindata: any = {};

    constructor(private util: AppService
        , private router: Router) {
        var userid = window.localStorage.getItem("userid");
        if (userid) {
            this.userid = userid;
        }
        var password = window.localStorage.getItem("password");
        if (password) {
            this.password = password;
        }
        this.logintext = "登录";
    }

    gatherLoginText(): void {
        let txt = "正在登录";
        if (!this.logindata.num) {
            this.logindata.num = 1;
        } else {
            this.logindata.num++;
        }
        if (this.logindata.num > 10) {
            this.logindata.num = 1;
        }
        for (let i = 0; i < this.logindata.num; i++) {
            txt += '.';
        }
        this.logintext = txt;
    }

    resetLoginText(): void {
        this.logintext = "登录";
    }

    login(): void {
        //this.router.navigate(['/main']);
        //return ;
    }

    cancel(): void {
        this.userid = '';
        this.password = '';
    }

    clearInput(name: string): void {
        this[name] = null;
    }


}

@NgModule({
    imports: [FormsModule, CommonModule, MaterialModule.forRoot(), HttpModule, JsonpModule],
    providers: [AppService, MdSnackBar],
    declarations: [LoginPageComponent],
    exports: [LoginPageComponent]
})
export class LoginPageModule {
}

