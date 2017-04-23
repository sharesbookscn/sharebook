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
    constructor(private util: AppService
        , private router: Router
        , private renderer: Renderer
        , private elem: ElementRef, private http: Http, private ngZone: NgZone) {

        // renderer.listenGlobal('document', 'scroll', this.onScroll.bind(this));
    }

    get() {
        var request = new XMLHttpRequest();
        request.open("GET", "http://www.google.com", true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200 || request.status == 0) {
                    // -> request.responseText <- is a result
                }
            }
        }
        request.send();
    }
    getBookInfo(barcode: string) {
        console.log("getBookInfo==",barcode);
        var request = new XMLHttpRequest();
        const url = "https://api.douban.com/v2/book/isbn/" + barcode;
        request.open("GET", url, true);
        request.onreadystatechange = function () {
            console.log("onreadystatechange===",request)
            if (request.readyState == 4) {
                if (request.status == 200 || request.status == 0) {
                    this.ngZone.run(() => {
                        console.log("----update data ---------");
                        this.scaninfo = JSON.parse(request.responseText);
                    });
                }
            }
        }.bind(this)
        request.send();
        console.log("end send ==");
    }
    testBarcode() {
        this.getBookInfo('9787543632608');
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

}



@NgModule({
    imports: [CommonModule, MaterialModule, FormsModule, ChartModule, PipeModule],
    declarations: [BookInComponent],
    exports: [BookInComponent],
    providers: [AppService],
})
export class BookInModule {
}

