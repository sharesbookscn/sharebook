import {NgModule}           from '@angular/core';
import {SafePipe}       from './safe.pipe';
@NgModule({
    declarations: [SafePipe],
    exports:[SafePipe]
})
export class SafeModule {
    static forRoot() {
        return {
            ngModule: SafeModule,
            providers: [],
        };
    }
}