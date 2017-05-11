import { Component, Input, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, Renderer, Pipe } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { AppService } from '../app.service'
import { Router } from '@angular/router';
import { ChartModule } from 'angular2-highcharts';
import './searchlist.less';
import { PipeModule } from '../../pipe';
declare var $: JQueryStatic;

@Component({
    selector: 'search-list',
    template: '' + require('./searchlist.html')
})

export class SearchListComponent {
    private booklist = [];
    private success: boolean;
    private hasnext: boolean = true;
    private page: number = 1;
    private msg: string;
    private querying = false;
    constructor(private util: AppService
        , private router: Router
        , private renderer: Renderer
        , private elem: ElementRef) {
        this.util.req("booklist", { page: 1 })
            .then((data) => {
                console.log(data);
                this.success = data.success;
                this.msg = data.msg;
                this.booklist = data.books;
            })
        // renderer.listenGlobal('document', 'scroll', this.onScroll.bind(this));
    }

    onScroll(event) {
        const elem = event.srcElement;
        var height = elem.clientHeight;
        let scrollheight = elem.scrollHeight;
        let scrollTop = elem.scrollTop;
        let diff = scrollheight - scrollTop - height;
        if (diff <= 50 && this.hasnext && ! this.querying) {
            this.page++;
            this.querying = true;
            this.util.req("booklist", { page: this.page })
                .then((data) => {
                    this.querying = false;
                    if (!data.books || data.books.length < 10) {
                        this.hasnext = false;
                    }
                    this.booklist = this.booklist.concat(data.books);
                })
        }
    }

}

@NgModule({
    imports: [CommonModule, MaterialModule, FormsModule, ChartModule, PipeModule],
    declarations: [SearchListComponent],
    exports: [SearchListComponent],
    providers: [AppService],
})
export class SearchListModule {
}

