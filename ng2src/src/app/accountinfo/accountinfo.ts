import { Component, Input, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, Renderer, Pipe,OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule, MdSnackBar, MdDialog, MdDialogRef } from '@angular/material';
import { AppService } from '../app.service'
import { Router } from '@angular/router';
import { ChartModule } from 'angular2-highcharts';
import './accountinfo.less';
import { PipeModule } from '../../pipe';
import { BookListModule } from '../booklist/booklist';

declare var $: JQueryStatic;

@Component({
    selector: 'account-info',
    template: '' + require('./accountinfo.html')
})

export class AccountInfoComponent{
    user: any;
    constructor(private util: AppService
        , private router: Router
        , private renderer: Renderer
        , private elem: ElementRef
        , public dialog: MdDialog
        , private snackBar: MdSnackBar
    ) {
        // this.util.checklogin();
        this.user = util.user;
        // renderer.listenGlobal('document', 'scroll', this.onScroll.bind(this));
    }
    gotologin() {
        window.localStorage.setItem("password","");
        this.router.navigate(['/login']);
    }
    openShareHistory() {
        let dialogRef = this.dialog.open(ShareHistoryDialog, { width: "100%", height: "100%" });
        // dialogRef.componentInstance.book = {};
        dialogRef.afterClosed().subscribe(result => {
        });
    }

}



@Component({
    selector: 'sharehistory',
    templateUrl: 'sharehistory.html',
})
export class ShareHistoryDialog {
    book: any;
    num = 1;
    begindate = new Date();
    enddate = new Date();
    success: boolean;
    msg: string;
    booklist:any;
    constructor(
        public dialogRef: MdDialogRef<ShareHistoryDialog>

        , private util: AppService
        , private snackBar: MdSnackBar
    ) {
        this.util.req("booklist", { page: 1 })
            .then((data) => {
                console.log(data);
                this.success = data.success;
                this.msg = data.msg;
                this.booklist = data.books;
            })
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
    imports: [CommonModule, MaterialModule, FormsModule, ChartModule, PipeModule, BookListModule],
    declarations: [AccountInfoComponent, ShareHistoryDialog],
    exports: [AccountInfoComponent],
    providers: [AppService],
    entryComponents: [ShareHistoryDialog]
})
export class AccountInfoModule {
}

