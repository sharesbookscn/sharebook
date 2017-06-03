import {
    Component, Input, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, Renderer, Pipe
    , NgZone
} from '@angular/core';
import { NgModule, Output, EventEmitter, SimpleChange, OnChanges } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Http, HttpModule, RequestOptions, Request, RequestMethod, Headers } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppService } from '../app.service'
import { Router } from '@angular/router';
import { ChartModule } from 'angular2-highcharts';
import './bookdetail.less';
import { PipeModule } from '../../pipe';
declare var $: JQueryStatic;
declare var cordova: any;
@Component({
    selector: 'book-detail',
    template: '' + require('./bookdetail.html')
})

export class BookDetailComponent implements OnChanges {
    scaninfo: any = {};
    result: any = {};
    private msg: string;
    private success: boolean;
    @Output() navToggle = new EventEmitter<boolean>();
    @Input() book: any;
    constructor(private util: AppService
        , private router: Router
        , private renderer: Renderer
        , private elem: ElementRef, private http: Http, private ngZone: NgZone) {

        // renderer.listenGlobal('document', 'scroll', this.onScroll.bind(this));
    }
    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

    }


    getBookInfo(barcode: string) {
    }
    getImgUrl() {
        if(!this.book){
            return " ";
        }
        return this.book.images ? this.book.images.large : './assets/img/app.png';
    }
    getUrl(type) {
        if(!this.book){
            return " ";
        }
        return this.book[type] || ' ';
    }
    getNum(){
        if(!this.book){
            return 0;
        }
        return this.book['num'] || 1;
    }
    getSummary() {
        if(!this.book){
            return " ";
        }
        return ( this.book["summary"] || ' ').replace(/[\n,=]/ig, "");
    }

    close() {
        this.navToggle.emit(true);
    }

    borrow(){
        this.util.req("borrow", this.book)
                .then((data) => {
                    this.success = data.success;
                    this.msg = data.msg;
                    alert(data.msg);
                })
    }

    focus(){
        this.util.req("focus", this.book)
                .then((data) => {
                    this.success = data.success;
                    this.msg = data.msg;
                    alert(data.msg);
                })
    }

}



@NgModule({
    imports: [CommonModule, MaterialModule, FormsModule, ChartModule, PipeModule],
    declarations: [BookDetailComponent],
    exports: [BookDetailComponent],
    providers: [AppService],
})
export class BookDetailModule {
}

