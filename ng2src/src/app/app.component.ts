import {Component} from '@angular/core';
import "bootstrap/less/bootstrap.less";
import "font-awesome/less/font-awesome.less";
import '@angular/material/prebuilt-themes/deeppurple-amber.css';
import './app.component.less';
import './main/main.page.less';

@Component({
    selector: 'app',
    template: '<router-outlet></router-outlet>' ,
    host: {
        '(document:deviceready)': '_deviceready($event)'
    },
})
export class AppComponent {
    subtitle = '(Final)';
    constructor(){

    }
    _deviceready(event:any){


    }
}

