import { Component, Input, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, Renderer, Pipe } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
    scaninfo:any={};
    constructor(private util: AppService
        , private router: Router
        , private renderer: Renderer
        , private elem: ElementRef) {

        // renderer.listenGlobal('document', 'scroll', this.onScroll.bind(this));
    }
    scan() {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                alert("We got a barcode\n" +
                    "Result: " + result.text + "\n" +
                    "Format: " + result.format + "\n" +
                    "Cancelled: " + result.cancelled);
                    this.scaninfo = result;
            }.bind(this),
            function (error) {
                alert("Scanning failed: " + error);
            }.bind(this),
            {
                preferFrontCamera: true, // iOS and Android
                showFlipCameraButton: true, // iOS and Android
                showTorchButton: true, // iOS and Android
                torchOn: true, // Android, launch with the torch switched on (if available)
                prompt: "请对准条形码", // Android
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
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

