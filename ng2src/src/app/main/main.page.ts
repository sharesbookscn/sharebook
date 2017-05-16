import { Component, AfterViewChecked, Renderer, ElementRef, } from '@angular/core';
import { NgModule, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule, MdDialog, MdDialogRef } from '@angular/material';
import { AppService } from '../app.service'
import { TrendingListModule } from '../trendinglist/trendinglist';
import { AccountInfoModule } from '../accountinfo/accountinfo';
import { BookListModule } from '../booklist/booklist';
import { SearchListModule } from '../searchlist/searchlist';
import { BookInModule } from '../bookin/bookin';
import { SearchDialog } from './search.dialog';
import { PipeModule } from '../../pipe';
import { BookDetailModule } from '../bookdetail/bookdetail';

@Component({
    selector: 'main-page',
    template: '' + require('./main.page.html'),
})
export class MainPageComponent implements AfterViewChecked {
    menus: any = null;
    private topTabIndex: number = 0;
    private subTabIndex = { 0: 0 };
    private showed: boolean = false;
    private currentbook: any;
    @ViewChild('booknav') booknav;
    constructor(private util: AppService
        , private renderer: Renderer
        , private elementRef: ElementRef
        , private dialog: MdDialog) {
        this.menus = this.util.user.menu;
        //util.checklogin();
    }

    topSelectChange(event: any) {
        console.log("topSelectChange ", event.index);
        this.topTabIndex = event.index;
        //this.elementRef.nativeElement.querySelector(".datatable.tablehead:visible").hide();
    }
    subSelectChange(event: any) {
        this.subTabIndex[this.topTabIndex] = event.index;
        //this.elementRef.nativeElement.querySelector(".datatable.tablehead:visible").hide();
    }
    isshow(i: number, j: number) {
        var top = this.topTabIndex;
        var sub = this.subTabIndex[this.topTabIndex];
        top = top ? top : 0;
        sub = sub ? sub : 0;
        return i == top && j == sub;
    }
    showing(event: any) {
        this.showed = true;
    }
    ngAfterViewChecked(): void {
        // var activetab:any, pre:any, next:any;
        // try {
        //     activetab = this.elementRef.nativeElement.querySelector(".subtab .md-tab-label.md-tab-active");
        //     pre = activetab.prev("div.md-tab-label");
        //     if (!pre || !pre.length || pre.length == 0) {
        //         pre = activetab;
        //     }
        //     next = activetab.next("div.md-tab-label");
        //     if (!next || !next.length || next.length == 0) {
        //         next = activetab;
        //     }
        // } catch (ex) {
        // }
        // if (activetab && activetab.length && activetab.length > 0) {
        //     var parent = activetab.parent();
        //     var marginleft:number = parseInt(parent.css("margin-left"));
        //     var maxwidth = parent.width() + marginleft;
        //     var currentwidth:number = next.position().left + next.outerWidth() - maxwidth;
        //     if (currentwidth > 0) {
        //         parent.css("margin-left", (-currentwidth) + "px");
        //     }
        //     var currentleft:number = pre.position().left + marginleft;
        //     if (currentleft < 0) {
        //         parent.css("margin-left", (marginleft - currentleft) + "px");
        //     }
        // }
    }
    opensearch() {
        let dialogRef = this.dialog.open(SearchDialog);
        dialogRef.afterClosed().subscribe(result => {
            // this.selectedOption = result;
        });
    }

    openBook(book) {
        console.log(book);
        this.currentbook = book;
        this.booknav.toggle();
    }

}



@NgModule({
    imports: [CommonModule, MaterialModule, TrendingListModule, AccountInfoModule,
        BookListModule, BookInModule, SearchListModule, PipeModule, FormsModule ,BookDetailModule],
    declarations: [MainPageComponent, SearchDialog],
    exports: [MainPageComponent, SearchDialog],
    providers: [AppService],
    entryComponents: [SearchDialog,]


})
export class MainPageModule {
}

