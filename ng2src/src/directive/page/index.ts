import {NgModule}           from '@angular/core';
import {PageDirective}       from './page.directive';
@NgModule({
    declarations: [PageDirective],
    exports:[PageDirective]
})
export class PageModule {
    static forRoot() {
        return {
            ngModule: PageModule,
            providers: [],
        };
    }
}