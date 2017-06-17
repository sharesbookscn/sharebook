import { Component, Input, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, Renderer, Pipe } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { AppService } from '../app.service'
import { Router } from '@angular/router';
import { ChartModule } from 'angular2-highcharts';
import './trendinglist.less';
import { PipeModule } from '../../pipe';
declare var $: JQueryStatic;

@Component({
    selector: 'trending-list',
    template: '' + require('./trendinglist.html')
})

export class TrendingListComponent {
    top100: any;
    constructor(private util: AppService
        , private router: Router
        , private renderer: Renderer
        , private elem: ElementRef) {
        this.refresh();
        // renderer.listenGlobal('document', 'scroll', this.onScroll.bind(this));
    }
    refresh() {
        this.util.req("top100", {})
            .then((data) => {
                console.log("top100====",data)
                this.top100 = data.top100;
            })
    }
    onScroll(event) {
        const elem = event.srcElement;
        var height = elem.clientHeight;
        let scrollheight = elem.scrollHeight;
        let scrollTop = elem.scrollTop;
        let diff = scrollheight - scrollTop - height;
        if (scrollTop == 0) {
            this.refresh();
        }
    }

}



@NgModule({
    imports: [CommonModule, MaterialModule, FormsModule, ChartModule, PipeModule],
    declarations: [TrendingListComponent],
    exports: [TrendingListComponent],
    providers: [AppService],
})
export class TrendingListModule {
}

