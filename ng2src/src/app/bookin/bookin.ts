import {
    Component, Input, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, Renderer, Pipe
    , NgZone
} from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Http, HttpModule, RequestOptions, Request, RequestMethod, Headers } from '@angular/http';
import { MaterialModule, MdDialog, MdDialogRef, MdNativeDateModule, MdSnackBar } from '@angular/material';
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
    private msg: string;
    private success: boolean;
    private testISBNs = ['9787544270878', '9787544285148', '9787532773800', '9787544272162', '9787544279598', '9787544275224']
    dialogdata: any;

    constructor(private util: AppService
        , private router: Router
        , private renderer: Renderer
        , private elem: ElementRef
        , private http: Http
        , private ngZone: NgZone
        , public dialog: MdDialog
        , private snackBar: MdSnackBar

    ) {

        // renderer.listenGlobal('document', 'scroll', this.onScroll.bind(this));
    }

    getBookInfo(barcode: string) {
        return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest();
            const url = "https://api.douban.com/v2/book/isbn/" + barcode;
            request.open("GET", url, true);
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    if (request.status == 200 || request.status == 0) {
                        resolve(JSON.parse(request.responseText));
                    }
                }
            }.bind(this)
            request.send();
        });
    }
    testBarcode() {
        this.getBookInfo(this.randomTestISBN());
    }
    randomTestISBN() {
        return this.testISBNs[Math.floor(Math.random() * 1000) % this.testISBNs.length];
    }
    getImgUrl() {
        return this.scaninfo.images ? this.scaninfo.images.large : './assets/img/app.png';
    }
    getUrl(type) {
        return this.scaninfo[type] || ' ';
    }
    getSummary() {
        return (this.scaninfo["summary"] || ' ').replace(/[\n,=]/ig, "");
    }
    scan() {
        return new Promise((resolve, reject) => {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    console.log(result);
                    if (result.text === 'test') {
                        //测试时使用
                        result.text = this.randomTestISBN();
                    }
                    resolve(this.getBookInfo(result.text))
                }.bind(this),
                function (error) {
                    reject("扫描失败: 请重试!");
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
        })

    }
    share() {
        this.util.checklogin().then((data) => {
            if (data && data.success) {
                this.scan().then((bookinfo) => {
                    this.scaninfo = bookinfo;
                    if (!this.scaninfo) {
                        // alert("请扫描书籍二维码!");
                        this.snackBar.open("请扫描书籍二维码!", "关闭", {
                            duration: 2000,
                        });
                    }
                    //扫描完成后弹出设置页面
                    let dialogRef = this.dialog.open(ShareInfoDialog, { width: "100%", height: "100%" });
                    this.scaninfo.num = 1;
                    this.scaninfo.sharedays = "一年";
                    dialogRef.componentInstance.book = this.scaninfo;
                    dialogRef.afterClosed().subscribe(result => {
                        this.dialogdata = result;
                    });

                });
            }
        })


    }

}

@Component({
    selector: 'shareinfodialog',
    templateUrl: 'shareinfo.html',
})
export class ShareInfoDialog {
    book: any;
    num = 1;
    begindate = new Date();
    enddate = new Date();
    success: boolean;
    msg: string;
    constructor(
        public dialogRef: MdDialogRef<ShareInfoDialog>
        , private util: AppService
        , private snackBar: MdSnackBar
    ) {
    }
    close() {
        this.dialogRef.close();
    }
    getImgUrl() {
        if (!this.book) {
            return " ";
        }
        return this.book.images ? this.book.images.large : './assets/img/app.png';
    }
    getUrl(type) {
        if (!this.book) {
            return " ";
        }
        return this.book[type] || ' ';
    }
    getNum() {
        if (!this.book) {
            return 0;
        }
        return this.book['num'] || 1;
    }
    getSummary() {
        if (!this.book) {
            return " ";
        }
        return (this.book["summary"] || ' ').replace(/[\n,=]/ig, "");
    }
    share() {
        this.util.req("auth/share", this.book)
            .then((data) => {
                console.log(data);
                this.success = data.success;
                this.msg = data.msg;
                if (this.success) {
                    // alert(this.msg);
                    this.snackBar.open(this.msg, "关闭", {
                        duration: 2000,
                    });
                    this.close();
                }
            })
    }
}


@NgModule({
    imports: [CommonModule, MaterialModule, FormsModule, ChartModule, PipeModule, MdNativeDateModule, ReactiveFormsModule],
    declarations: [BookInComponent, ShareInfoDialog],
    exports: [BookInComponent],
    providers: [AppService],
    entryComponents: [ShareInfoDialog]
})
export class BookInModule {
}

