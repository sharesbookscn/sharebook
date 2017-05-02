import { Component, Injectable, ViewContainerRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule, Jsonp } from '@angular/http';
import { MaterialModule, MdSnackBar, MdSnackBarModule, MdSnackBarConfig } from '@angular/material';
import { FormsModule } from '@angular/forms';

import './register.page.less'
import { AppService } from '../app.service'
import { Router } from '@angular/router';
import { Observable } from "rxjs";
let md5 = require('blueimp-md5/js/md5.js');

@Component({
    selector: 'register-page',
    template: '' + require('./register.page.html'),
    providers: [MdSnackBar]
})
export class RegisterPageComponent {
    userid: any = null;
    password: any = null;
    rppassword: any = null;
    msg: any = null;
    logining: boolean = false;
    logintext: string;
    logininter: any;
    logindata: any = {};

    constructor(private util: AppService
        , private router: Router) {

    }

    register(): void {
        this.msg = "";
        if (!this.userid) {
            this.msg = "用户名不能为空!";
            return;
        }
        if (this.userid.length < 5) {
            this.msg = "用户名长度不能小于5!";
            return;
        }
        if (!this.password) {
            this.msg = "密码不能为空!";
            return;
        }
        if (this.password.length < 6) {
            this.msg = "密码长度不能小于6位!";
            return;
        }
        if (this.password != this.rppassword) {
            this.msg = "两次密码不一致!";
            return;
        }
        window.localStorage.setItem("userid", this.userid);
        this.util.req("register", { userid: this.userid, password: this.password })
            .then((data) => {
                console.log(data);
                this.msg = data.msg;
                this.password = "";
                this.rppassword = "";
            })
    }
    gotologin(): void {
        this.router.navigate(['/login']);
    }

    cancel(): void {
        this.userid = '';
        this.password = '';
    }

    clearInput(name: string): void {
        this[name] = null;
    }


}


