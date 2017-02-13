import {NgModule}           from '@angular/core';
import {PageModule}       from './page/';
import {MenuModule} from '../app/menu/menu.module';

// const entry = [MenuComponent];
// const req = require.context("../", true, /^\.\/.*\.component.ts$/);
// const keys = req.keys();
// let promiseArray = [];

@NgModule({
    imports:[PageModule,MenuModule],
    exports:[PageModule],
})
export class DirectiveModule {
}
