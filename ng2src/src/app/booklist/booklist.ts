import { Component ,Input, ViewChild, ElementRef, AfterViewInit,AfterViewChecked,Renderer,Pipe} from '@angular/core';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { AppService} from '../app.service'
import { Router  } from '@angular/router';
import { ChartModule } from 'angular2-highcharts';
import './booklist.less';
import { PipeModule} from '../../pipe';
declare var $:JQueryStatic;

@Component({
    selector: 'book-list',
    template :'' + require('./booklist.html')
})

export class BookListComponent {

    constructor(private util:AppService
        , private router:Router
        , private renderer:Renderer
        ,private elem: ElementRef) {

        // renderer.listenGlobal('document', 'scroll', this.onScroll.bind(this));
    }


}



@NgModule({
    imports: [CommonModule, MaterialModule, FormsModule, ChartModule,PipeModule],
    declarations: [BookListComponent],
    exports: [BookListComponent],
    providers: [AppService],
})
export class BookListModule {
}

