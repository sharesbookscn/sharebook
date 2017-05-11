import { Component, AfterViewChecked, Renderer, ElementRef, EventEmitter, Output } from '@angular/core';
import { MaterialModule, MdDialog, MdDialogRef } from '@angular/material';
import { AppService } from '../app.service';
import './search.dialog.less'


@Component({
    selector: 'search-dialog',
    templateUrl: './search.dialog.html',
})
export class SearchDialog {
    private booklist = [];
    private success: boolean;
    private page = 1;
    private msg: string;
    private querying = false;
    private searchtext: string = '';
    private searchlist = [];
    private popularsearchs = [];
    private lastsearchs = [];
    private showsearch = false;
    private hasnext = true;
    private showstate = 1; // 1表示初始状态, 2 表示输入搜索页面的状态, 3, 表示查询结果
    @Output() navToggle = new EventEmitter<boolean>();
    constructor(private util: AppService) {
        // this.util.req("booklist", { page: 1 })
        //     .then((data) => {
        //         console.log(data);
        //         this.success = data.success;
        //         this.msg = data.msg;
        //         this.booklist = data.books;
        //     });
        this.util.req("popularsearch", { page: 1 })
            .then((data) => {
                console.log("==popularsearch", data);
                this.success = data.success;
                this.msg = data.msg;
                this.popularsearchs = data.books;
            });
        this.getLastSearchs();

        // renderer.listenGlobal('document', 'scroll', this.onScroll.bind(this));
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
            this.util.req("search", { text: this.searchtext, page: this.page })
                .then((data) => {
                    this.success = data.success;
                    this.msg = data.msg;

                    this.showsearch = false;
                    this.showstate = 3;
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
    getLastSearchs() {
        this.util.req("lastsearchs", { page: 1 })
            .then((data) => {
                console.log("==lastsearchs", data);
                this.success = data.success;
                this.msg = data.msg;
                this.lastsearchs = data.searchs;
            });
    }
    close() {
        this.navToggle.emit(true);
    }

    search(text: string, page: number) {
        this.page = 1;
        this.searchtext = text;
        this.querying = true;
        this.util.req("search", { text: text, page: page ? page : this.page })
            .then((data) => {
                this.querying = false;
                this.success = data.success;
                this.msg = data.msg;
                this.searchlist = data.books;
                this.showsearch = false;
                this.showstate = 3;
                if (data.books.length < 10) {
                    this.hasnext = false;
                } else {
                    this.hasnext = true;
                }
            })
    }
    focusInput() {
        console.log("...keypress...")
        if (this.searchtext) {
            this.showstate = 2;
            this.hasnext = true;
        } else {
            this.showstate = 1;
            this.getLastSearchs();
        }
    }
    clearSearch() {
        this.searchtext = '';
        this.showstate = 1;
        this.getLastSearchs();
    }
    isShow() {
        if (!this.searchtext) {
            return true;
        } else {
            return this.showsearch;
        }
    }


}