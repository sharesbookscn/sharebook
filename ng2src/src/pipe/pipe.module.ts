import {NgModule}           from '@angular/core';
import {OrderByModule}       from './orderby/';
import {StringModule}       from './string/';
import {ArrayModule}       from './array/';
import {SafeModule}       from './safe/';

@NgModule({
    imports:[StringModule.forRoot(),OrderByModule.forRoot(),SafeModule.forRoot()],
    exports: [StringModule,OrderByModule,ArrayModule,SafeModule]
})
export class PipeModule {
}