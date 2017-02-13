import {Pipe,PipeTransform } from "@angular/core";
@Pipe({
    name: 'titleFilter',
    pure: false
})
export class TitleFilterPipe implements PipeTransform {
    transform(items: any[], args: any) {
        return items.filter((item) => {
            // console.dir(items);
            // console.dir(args);
            if (!args){
                return true;
            }
            return item.text.indexOf(args)>=0
        });
    }
}