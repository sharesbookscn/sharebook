import {NgModule}           from '@angular/core';
import {ParentFilterPipe}       from './parent.filter.pipe';
import {TitleFilterPipe}       from './title.filter.pipe';
import {ObjectFilterPipe}       from './object.filter.pipe';
@NgModule({
    declarations: [ParentFilterPipe,TitleFilterPipe,ObjectFilterPipe],
    exports:[ParentFilterPipe,TitleFilterPipe,ObjectFilterPipe]
})
export class ArrayModule {
    static forRoot() {
        return {
            ngModule: ArrayModule,
            providers: [],
        };
    }
}