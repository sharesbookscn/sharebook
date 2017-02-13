import {Pipe,PipeTransform } from "@angular/core";
@Pipe({
    name: 'upper'
})
export class UpperPipe implements PipeTransform {
    transform(val) {
        return  !val ? null : val.toUpperCase();
    }
}