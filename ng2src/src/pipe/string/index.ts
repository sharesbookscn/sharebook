import {NgModule}           from '@angular/core';
import {LowerPipe}       from './lower.pipe';
import {UpperPipe}       from './upper.pipe';
@NgModule({
    declarations: [LowerPipe,UpperPipe],
    exports:[LowerPipe,UpperPipe]
})
export class StringModule {
    static forRoot() {
        return {
            ngModule: StringModule,
            providers: [],
        };
    }
}