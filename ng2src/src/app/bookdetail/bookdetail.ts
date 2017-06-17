import {
    Component, Input, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, Renderer, Pipe
    , NgZone
} from '@angular/core';
import { NgModule, Output, EventEmitter, SimpleChange, OnChanges } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Http, HttpModule, RequestOptions, Request, RequestMethod, Headers } from '@angular/http';
import { MaterialModule ,MdSnackBar} from '@angular/material';
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
        , private elem: ElementRef, private http: Http, private ngZone: NgZone
        , private snackBar: MdSnackBar
        ) {

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
        this.util.req("auth/borrow", this.book)
                .then((data) => {
                    this.success = data.success;
                    this.msg = data.msg;
                    this.snackBar.open(data.msg, "关闭", {
                        duration: 1000,
                        });
                })
    }

    focus(){
        this.util.req("auth/focus", this.book)
                .then((data) => {
                    this.success = data.success;
                    this.msg = data.msg;
                    this.snackBar.open(data.msg, "关闭", {
                        duration: 1000,
                        });
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

