import { Component ,Input, ViewChild, ElementRef, AfterViewInit,AfterViewChecked,Renderer,Pipe} from '@angular/core';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { AppService} from '../app.service'
import { Router  } from '@angular/router';
import { ChartModule } from 'angular2-highcharts';
import './pielist.less';
import { PipeModule} from '../../pipe';
declare var $:JQueryStatic;

@Component({
    selector: 'pielist',
    template :'' + require('./pielist.html')
})

export class PieListComponent {
    @Input() url:string;
    @Input() display:string = 'pie';
    @Input() type:string = '3';
    @Input() hastype:string = '1';
    @Input() text:string = '';
    @Input() show:boolean = false;
    code:string = 'name';
    value:string = 'num';
    data:any;
    msg:string;
    options:any;
    cfg:any;
    colorarray  =  ['#90ed7d',  '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1', '#7cb5ec', '#d954b4','#f7a35c'];
    orderby:string;
    ordertype:string = "desc";
    showed:boolean = false;
    loaded:boolean = false;

    constructor(private util:AppService
        , private router:Router
        , private renderer:Renderer
        ,private elem: ElementRef) {

        renderer.listenGlobal('document', 'scroll', this.onScroll.bind(this));
    }

    clickHead(orderby :string){
        if(this.orderby ===orderby){
            this.ordertype = this.ordertype ==='desc'? 'asc':'desc';
        }else{
            this.ordertype ='desc';
            this.orderby = orderby;
        }
    }
    getOrderIcon(){
        return this.ordertype ==='desc'? 'fa-caret-down':'fa-caret-up';
    }
    onScroll(event:any){
        var head = $(event.srcElement).find(".tablehead");
        var realtable = $(event.srcElement).find(".realtable");
        var postion=$(event.srcElement).find(".realtable").position();
        head.width(realtable.width());
        var headths =  head.find("tr:first-child >th ");
        var tableths =  realtable.find("tr:first-child >th");
        for(var i = 0 ;i < headths.length;i++){
            $(headths[i]).width($(tableths[i]).width())
        }
        if(postion.top <= 0){
            head.show();
        }else{
            head.hide();
        }
    }
    ngOnChanges(changeRecord:any) {
        console.log("this.show===",this.show);
        if ("show" in changeRecord) {
            const val = changeRecord['show'];
            console.log("val=== " ,val);
            console.log("val===true ===== " ,val.currentValue==true);
            if (this.showed == false && val.currentValue==true && val.currentValue != val.previousValue) {
                const url = this.url + "/" + this.type;
                this.query(url);
                this.showed = true;
            }
        }
        if(this.show ==true) {
            if ("url" in changeRecord) {
                const val = changeRecord['url'];
                if (val.currentValue != val.previousValue) {
                    const newvalue = val.currentValue;
                    const url = newvalue + "/" + this.type;
                    this.query(url);
                }
            }
            if ("type" in changeRecord) {
                const val = changeRecord['type'];
                if (val.currentValue != val.previousValue) {
                    const newvalue = val.currentValue;
                    const url = this.url + "/" + newvalue;
                    this.query(url);
                }
            }
        }
    }

    changetype(type:string):void {
        const url = this.url + "/" + type;
        console.log(url);
        this.query(url);
    }


    private query(url:string):void {
        this.util.request(url)
            .then((response:any)=> {
                if (response !== false && response.success === true) {
                    this.loaded = true;
                    this.data = response.data;
                    this.cfg = this.data.cfg;
                    this.code = this.data.cfg.code;
                    this.value = this.data.cfg.value;
                    this.initPie();
                } else {
                    this.msg = response.message;
                }
            });
    }

    private initPie():void {

        this.options = {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                },
                height: 400,
            },
            colors: this.colorarray,
            title: {
                text: this.text,
                floating: true
            },

            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true, format: '{point.name}'
                    }
                }
            }, series: this.getSrialData(this.data.querydata)
        };
    }

    private  getSrialData(values:any):Array<any> {
        var pieobj = {name: this.text, data: this.getdata(values), colorByPoint: true};
        return [pieobj];
    }

    private getdata(values:any):Array<any> {
        var data:any[] = [];
        if (values && values.length && values.length > 0) {
            for (var i = 0; i < values.length; i++) {
                var value = values[i];
                var floatvalue:number;
                try {
                    floatvalue = parseFloat(value[this.value]);
                } catch (ex) {
                    floatvalue = 0;
                }
                if (floatvalue && floatvalue > 0) {
                    var obj = {"name": value[this.code], "y": floatvalue};
                    data.push(obj);
                }
            }
        } else {
            data.push({"name": '无数据', "y": 1});
        }
        return data;
    }

}



@NgModule({
    imports: [CommonModule, MaterialModule, FormsModule, ChartModule,PipeModule],
    declarations: [PieListComponent],
    exports: [PieListComponent],
    providers: [AppService],
})
export class PieListModule {
}

