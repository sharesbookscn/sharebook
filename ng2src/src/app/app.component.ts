import { Component } from '@angular/core';
import "bootstrap/less/bootstrap.less";
import "font-awesome/less/font-awesome.less";
import '@angular/material/prebuilt-themes/deeppurple-amber.css';
import './app.component.less';
import './main/main.page.less';
import { AppService } from './app.service';
@Component({
    selector: 'app',
    template: '<router-outlet></router-outlet>',
    host: {
        '(document:deviceready)': '_deviceready($event)',
        '(document:load)': '_deviceready($event)'
    },
})
export class AppComponent {
    subtitle = '(Final)';
    mqttinited: false;
    constructor(private util: AppService) {

    }
    _deviceready(event: any) {
        // if (!this.mqttinited)
            // this.util.initMqtt();

    }
}

