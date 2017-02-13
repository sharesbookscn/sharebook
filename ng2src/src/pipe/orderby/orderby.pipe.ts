import { Pipe,PipeTransform } from '@angular/core';
import { NgModule }      from '@angular/core';
@Pipe({
    name: "orderby"
})
export class OrderByPipe implements PipeTransform {
    transform(array: Array<string>, code: string,order:string): Array<string> {
        if(!code){
            return array;
        }
        var less = -1 ;
        var more = 1 ;
        if(order == 'desc'){
            less = 1;
            more = -1;
        }
        function sort(a: any, b: any) {
            if (a[code] < b[code]) {
                return less;
            } else if (a[code] > b[code]) {
                return more;
            } else {
                return 0;
            }
        }
        array.sort(sort);
        return array;
    }

}

@NgModule({
    imports: [],
    declarations: [OrderByPipe],
    exports: [OrderByPipe],
    providers: [],
})
export class OrderByPipeModule {
}