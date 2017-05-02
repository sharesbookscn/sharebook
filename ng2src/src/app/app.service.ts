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
import { connect, Client, Store } from 'mqtt';
@Injectable(

)
export class AppService {
    user: User = { userid: null, username: null, menu: null };
    logined = false;
    private mqttclient: any;
    err: any;
    errmsg: string;
    deviceId = (window['device'] && window['device'].uuid)? window['device'].uuid : this.guid();
    constructor(private jsonp: Jsonp, private router: Router) {
        this.initMqtt();
    }
    private messageListeners = {};
    private messageListeneruuids = [];
    private initMqtt() {
        this.mqttclient = connect(Config.server);
        this.mqttclient.on("error", (err) => {
            this.err = err;
            this.errmsg = "服务器连接失败!请重试!";
        });
        //订阅clientid
        this.mqttclient.subscribe(this.mqttclient.options.clientId);
        this.mqttclient.on("message", (topic, payload)=>{
            Object.keys(this.messageListeners).forEach((key)=>{
                var val = this.messageListeners[key];
                val(topic, payload);
            });
            // this.messageListeners.forEach((func) => func(topic, payload));
        });
        this.mqttclient.on("connect", (connack)=> {
            const msg = {deviceid: this.deviceId };
            this.req("regdevice",msg);
        });
    } 
    public guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
    /**
     * 
     * @param param 
     * @param callback  必须是promise
     */
    public req(type:string , param: any): any {
        return new Promise((resolve, reject) => {
            try {
                const uuid = this.guid();
                this.messageListeneruuids.push(uuid);
                const data = { type: type, uuid: uuid, param: param };
                //callback必须是promise
                let func = (topic, payload) => {
                    //从列表中移除uuid
                    for (var i = this.messageListeneruuids.length - 1; i > -1; i--) {
                        if (this.messageListeneruuids[i] === uuid) {
                            this.messageListeneruuids.splice(i, 1);
                        }
                    }
                    //并从lisenors中移除函数
                    delete this.messageListeners[uuid];
                    //返回结果
                    resolve(JSON.parse(payload.toString()).data);
                }
                this.messageListeners[uuid] = func;
                this.mqttclient.publish("server", JSON.stringify(data));
            } catch (ex) {
                reject(ex);
            }
        });

    }
    public listen(callback) {

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

