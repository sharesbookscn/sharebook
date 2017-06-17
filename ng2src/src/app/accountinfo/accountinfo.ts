import { Component, Input, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, Renderer, Pipe, OnInit } from '@angular/core';
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

export class AccountInfoComponent {
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
        window.localStorage.setItem("password", "");
        this.router.navigate(['/login']);
    }
    openShareHistory() {
        let dialogRef = this.dialog.open(ShareHistoryDialog, { width: "100%", height: "100%" });
        // dialogRef.componentInstance.book = {};
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    openBorrowHistory() {
        let dialogRef = this.dialog.open(BorrowHistoryDialog, { width: "100%", height: "100%" });
        // dialogRef.componentInstance.book = {};
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    openCurrentShare() {
        let dialogRef = this.dialog.open(CurrentShareDialog, { width: "100%", height: "100%" });
        // dialogRef.componentInstance.book = {};
        dialogRef.afterClosed().subscribe(result => {
        });

    }
    openFocusList() {
        let dialogRef = this.dialog.open(FocusListDialog, { width: "100%", height: "100%" });
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
    searchlist: any;
    page = 1;
    querying = false;
    hasnext = false;
    constructor(
        public dialogRef: MdDialogRef<ShareHistoryDialog>

        , private util: AppService
        , private snackBar: MdSnackBar
    ) {
        this.refresh();
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
    onScroll(event) {
        const elem = event.srcElement;
        var height = elem.clientHeight;
        let scrollheight = elem.scrollHeight;
        let scrollTop = elem.scrollTop;
        let diff = scrollheight - scrollTop - height;
        if (diff <= 50 && this.hasnext && !this.querying) {
            this.page++;
            this.querying = true;
            this.util.req("auth/sharelist", { page: this.page })
                .then((data) => {
                    this.success = data.success;
                    this.msg = data.msg;
                    if (data.books.length < 10) {
                        this.hasnext = false;
                    } else {
                        this.hasnext = true;
                    }
                    this.querying = false;
                    this.searchlist = this.searchlist.concat(data.books);
                })
        }
    }
    refresh() {
        this.util.req("auth/sharelist", { page: 1 })
            .then((data) => {
                console.log(data);
                if (data.books.length < 10) {
                    this.hasnext = false;
                } else {
                    this.hasnext = true;
                }
                this.success = data.success;
                this.msg = data.msg;
                this.searchlist = data.books;
            })
    }
}


@Component({
    selector: 'focuslist',
    templateUrl: 'focuslist.html',
})
export class FocusListDialog {
    book: any;
    num = 1;
    begindate = new Date();
    enddate = new Date();
    success: boolean;
    msg: string;
    searchlist: any;
    page = 1;
    querying = false;
    hasnext = false;
    constructor(
        public dialogRef: MdDialogRef<FocusListDialog>

        , private util: AppService
        , private snackBar: MdSnackBar
    ) {
        this.refresh();
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
    onScroll(event) {
        const elem = event.srcElement;
        var height = elem.clientHeight;
        let scrollheight = elem.scrollHeight;
        let scrollTop = elem.scrollTop;
        let diff = scrollheight - scrollTop - height;
        if (diff <= 50 && this.hasnext && !this.querying) {
            this.page++;
            this.querying = true;
            this.util.req("auth/sharelist", { page: this.page })
                .then((data) => {
                    this.success = data.success;
                    this.msg = data.msg;
                    if (data.books.length < 10) {
                        this.hasnext = false;
                    } else {
                        this.hasnext = true;
                    }
                    this.querying = false;
                    this.searchlist = this.searchlist.concat(data.books);
                })
        }
    }
    refresh() {
        this.util.req("auth/sharelist", { page: 1 })
            .then((data) => {
                console.log(data);
                if (data.books.length < 10) {
                    this.hasnext = false;
                } else {
                    this.hasnext = true;
                }
                this.success = data.success;
                this.msg = data.msg;
                this.searchlist = data.books;
            })
    }
}

@Component({
    selector: 'borrowhistory',
    templateUrl: 'borrowhistory.html',
})
export class BorrowHistoryDialog {
    book: any;
    num = 1;
    begindate = new Date();
    enddate = new Date();
    success: boolean;
    msg: string;
    searchlist: any;
    page = 1;
    querying = false;
    hasnext = false;
    constructor(
        public dialogRef: MdDialogRef<BorrowHistoryDialog>

        , private util: AppService
        , private snackBar: MdSnackBar
    ) {
        this.refresh();
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
    onScroll(event) {
        const elem = event.srcElement;
        var height = elem.clientHeight;
        let scrollheight = elem.scrollHeight;
        let scrollTop = elem.scrollTop;
        let diff = scrollheight - scrollTop - height;
        if (diff <= 50 && this.hasnext && !this.querying) {
            this.page++;
            this.querying = true;
            this.util.req("auth/sharelist", { page: this.page })
                .then((data) => {
                    this.success = data.success;
                    this.msg = data.msg;
                    if (data.books.length < 10) {
                        this.hasnext = false;
                    } else {
                        this.hasnext = true;
                    }
                    this.querying = false;
                    this.searchlist = this.searchlist.concat(data.books);
                })
        }
    }
    refresh() {
        this.util.req("auth/sharelist", { page: 1 })
            .then((data) => {
                console.log(data);
                if (data.books.length < 10) {
                    this.hasnext = false;
                } else {
                    this.hasnext = true;
                }
                this.success = data.success;
                this.msg = data.msg;
                this.searchlist = data.books;
            })
    }

}

@Component({
    selector: 'currentshare',
    templateUrl: 'currentshare.html',
})
export class CurrentShareDialog {
    book: any;
    num = 1;
    begindate = new Date();
    enddate = new Date();
    success: boolean;
    msg: string;
    searchlist: any;
    page = 1;
    querying = false;
    hasnext = false;
    constructor(
        public dialogRef: MdDialogRef<CurrentShareDialog>

        , private util: AppService
        , private snackBar: MdSnackBar
    ) {
        this.refresh();
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
    onScroll(event) {
        const elem = event.srcElement;
        var height = elem.clientHeight;
        let scrollheight = elem.scrollHeight;
        let scrollTop = elem.scrollTop;
        let diff = scrollheight - scrollTop - height;
        if (diff <= 50 && this.hasnext && !this.querying) {
            this.page++;
            this.querying = true;
            this.util.req("auth/sharelist", { page: this.page })
                .then((data) => {
                    this.success = data.success;
                    this.msg = data.msg;
                    if (data.books.length < 10) {
                        this.hasnext = false;
                    } else {
                        this.hasnext = true;
                    }
                    this.querying = false;
                    this.searchlist = this.searchlist.concat(data.books);
                })
        }
    }
    refresh() {
        this.util.req("auth/sharelist", { page: 1 })
            .then((data) => {
                console.log(data);
                if (data.books.length < 10) {
                    this.hasnext = false;
                } else {
                    this.hasnext = true;
                }
                this.success = data.success;
                this.msg = data.msg;
                this.searchlist = data.books;
            })
    }
}



@NgModule({
    imports: [CommonModule, MaterialModule, FormsModule, ChartModule, PipeModule, BookListModule],
    declarations: [AccountInfoComponent, ShareHistoryDialog
        , BorrowHistoryDialog
        , CurrentShareDialog
        , FocusListDialog
    ],
    exports: [AccountInfoComponent],
    providers: [AppService],
    entryComponents: [ShareHistoryDialog
        , BorrowHistoryDialog
        , CurrentShareDialog
        , FocusListDialog
    ]
})
export class AccountInfoModule {
}

