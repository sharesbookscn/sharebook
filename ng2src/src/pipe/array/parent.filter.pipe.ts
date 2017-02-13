import {Pipe,PipeTransform } from "@angular/core";
@Pipe({
    name: 'parentFilter',
    pure: false
})
export class ParentFilterPipe implements PipeTransform {
    transform(items: any[], args: any) {
        return items.filter((item) => {
            if (!args || !args.id || args.id ==0){
                return true;
            }
            return item.parent == args.id
        });
    }
}