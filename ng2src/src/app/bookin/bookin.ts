import {
    Component, Input, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, Renderer, Pipe
    , NgZone
} from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Http, HttpModule, RequestOptions, Request, RequestMethod, Headers } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppService } from '../app.service'
import { Router } from '@angular/router';
import { ChartModule } from 'angular2-highcharts';
import './bookin.less';
import { PipeModule } from '../../pipe';
declare var $: JQueryStatic;
declare var cordova: any;
@Component({
    selector: 'book-in',
    template: '' + require('./bookin.html')
})

export class BookInComponent {
    scaninfo: any = {};
    result: any = {};
    private msg:string;
    private success:boolean;
    private testISBNs=['9787544270878','9787544285148','9787532773800','9787544272162','9787544279598','9787544275224']
    constructor(private util: AppService
        , private router: Router
        , private renderer: Renderer
        , private elem: ElementRef, private http: Http, private ngZone: NgZone) {

        // renderer.listenGlobal('document', 'scroll', this.onScroll.bind(this));
    }

    getBookInfo(barcode: string) {
        var request = new XMLHttpRequest();
        const url = "https://api.douban.com/v2/book/isbn/" + barcode;
        request.open("GET", url, true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200 || request.status == 0) {
                    this.ngZone.run(() => {
                        this.scaninfo = JSON.parse(request.responseText);
                    });
                }
            }
        }.bind(this)
        request.send();
    }
    testBarcode() {
        this.getBookInfo(this.randomTestISBN());
    }
    randomTestISBN(){
        return this.testISBNs[Math.floor(Math.random() *  1000) %this.testISBNs.length ];
    }
    getImgUrl() {
        return this.scaninfo.images ? this.scaninfo.images.large : './assets/img/app.png';
    }
    getUrl(type) {
        return this.scaninfo[type] || ' ';
    }
    scan() {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                console.log(result);
                if(result.text==='test'){
                    //测试时使用
                    result.text=this.randomTestISBN();
                }
                this.ngZone.run(() => {
                    this.getBookInfo(result.text);
                });
            }.bind(this),
            function (error) {
                alert("扫描失败: 请重试!");
            }.bind(this),
            {
                preferFrontCamera: false, // iOS and Android
                showFlipCameraButton: false, // iOS and Android
                showTorchButton: true, // iOS and Android
                torchOn: false, // Android, launch with the torch switched on (if available)
                prompt: "请对准条形码", // Android
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                formats: "EAN_13", // default: all but PDF_417 and RSS_EXPANDED
                orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations: true, // iOS
                disableSuccessBeep: false // iOS
            }
        );
    }
    share() {
        if (!this.scaninfo) {
            alert("请扫描书籍二维码!");
        }
        this.util.req("auth/share", this.scaninfo)
            .then((data) => {
                console.log(data);
                this.success =data.success;
                this.msg = data.msg;
            })
    }

}



@NgModule({
    imports: [CommonModule, MaterialModule, FormsModule, ChartModule, PipeModule],
    declarations: [BookInComponent],
    exports: [BookInComponent],
    providers: [AppService],
})
export class BookInModule {
}

