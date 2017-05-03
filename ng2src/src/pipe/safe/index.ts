import {NgModule}           from '@angular/core';
import {SafeUrlPipe,SafeCssPipe,SafeHtmlPipe,SafeJsPipe,SafeRsPipe}       from './safe.pipe';
@NgModule({
    declarations: [SafeUrlPipe,SafeCssPipe,SafeHtmlPipe,SafeJsPipe,SafeRsPipe],
    exports:[SafeUrlPipe,SafeCssPipe,SafeHtmlPipe,SafeJsPipe,SafeRsPipe]
})
export class SafeModule {
    static forRoot() {
        return {
            ngModule: SafeModule,
            providers: [],
        };
    }
}