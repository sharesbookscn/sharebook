import {Pipe,PipeTransform } from "@angular/core";
@Pipe({
    name: 'objFilter',
    pure: false
})
export class ObjectFilterPipe implements PipeTransform {
    transform(items: any[], args: any) {
        return items.filter((item) => {
            const keys = Object.keys(args);
            let flag = true;
            keys.forEach((key)=>{
                if(item[key]!==args[key]){
                    flag = false;
                }
            });
            return flag;
        });
    }
}