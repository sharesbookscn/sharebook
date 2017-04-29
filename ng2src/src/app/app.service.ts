import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http'
import { Config } from './conf/conf'
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
class User {
    public userid: string;
    public username: string;
    public menu: Array<any>;
}
import { connect , Client,Store } from 'mqtt';
// console.log(MQTT);
// let mqtt = require('mqtt/webmqtt');
@Injectable(

)
export class AppService {
    user: User = { userid: null, username: null, menu: null };
    logined = false;
    constructor(private jsonp: Jsonp, private router: Router) {
        this.connectMqtt();
    }
    public connectMqtt() {
        console.log("connect...")
        //console.log(mqtt);
        //var mqtt = MQTT.mqtt;
        var client = connect(Config.mqttserver);
        console.log(client.options.clientId);
        client.on("error", function (err) {
            console.log("error...", err)
        });
        console.log("subscribe...")

        client.subscribe("mqtt/demo");

        client.on("message", function (topic, payload) {
            console.log("message...");
            alert([topic, payload].join(": "));
            client.end();
        });

        client.on("connect", function (connack) {
            console.log("connect....");
            console.log(connack);
            console.log(client);
        });

        console.log("publish...")

        client.publish("mqtt/demo", "hello world!");
    }
    public request(url: any): any {
        if (!this.logined) {
            this.router.navigate(['/login']);
            return new Promise(function (resolve, reject) { resolve(false); });
        }
        return this.requestNoAuth(url);
    }
    public checklogin(): boolean {
        if (!this.logined) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

    private requestNoAuth(url: any): any {
        // return new Promise(function (resolve, reject) { resolve({ success: true }); });
        url = Config.server + url;
        url = (url.indexOf("?") >= 0 ? url + "&" : url + "?") + "callback=JSONP_CALLBACK";
        return this.jsonp.request(url).toPromise()
            .then((data: any) => {
                console.log(data._body);
                return data._body;
            },
            (error: any) => {
                return {
                    success: false,
                    msg: '请求异常!请与管理员联系!',
                    error: error
                };
            }
            );
    }

    public login(user: any): any {
        // this.logined = true;
        // return new Promise(function(resolve, reject) { resolve({success:true}); });
        console.log(user);
        return this.requestNoAuth("/authapp/login/" + user.userid + "/" + user.pwd)
            .then((data: any) => {
                var retdata = data;
                if (retdata.success === true) {
                    this.logined = true;
                    this.user.userid = retdata.username;
                    this.user.username = retdata.username;
                    this.user.menu = retdata.menu;
                    for (var i = 0; i < this.user.menu.length; i++) {
                        var menu = this.user.menu[i];
                        for (var j = 0; j < menu.submenu.length; j++) {
                            var submenu = menu.submenu[j];
                            if (submenu.isnew) {
                                menu.isnew = true;
                                break;
                            }
                        }
                    }
                } else {
                    this.logined = false;
                }
                return retdata;
            }, (error: any) => {
                this.logined = false;
                return {
                    success: false,
                    msg: '请求异常!请与管理员联系!',
                    error: error
                };
            })
    }

    public logout(user: any): void {
        this.logined = false;
    }

}

