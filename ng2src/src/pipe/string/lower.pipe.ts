import {Pipe,PipeTransform } from "@angular/core";
@Pipe({
    name: 'lower'
})
export class LowerPipe implements PipeTransform {
    transform(val) {
        console.log(val);
        return  !val ? null : val.toLowerCase();
    }
}