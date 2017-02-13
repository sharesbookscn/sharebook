import {Directive, ViewContainerRef, ComponentFactoryResolver, Input, ComponentFactory} from '@angular/core';

@Directive({
    selector: '[page]',
})
export class PageDirective {
    @Input()  page;

    constructor(public viewContainerRef: ViewContainerRef
        , private _componentFactoryResolver: ComponentFactoryResolver
    ) {

    }
    ngOnInit() {
        if( this.page) {
            var req = require.context("../../", true, /^\.\/.*\.component.ts$/);
            const strs = this.page.split("#");
            let name = strs[0];
            const componentname = strs[1];
            const modulepromise = new Promise(function (resolve) {
                (require as any).ensure([], function (require: any) {
                    resolve(req('./'+name+'.ts')[componentname]);
                })
            });
            modulepromise.then((module: any) => {
                 // new ComponentFactory()
                let componentFactory = this._componentFactoryResolver.resolveComponentFactory(module);
                let viewContainerRef = this.viewContainerRef;
                let componentRef = viewContainerRef.createComponent(componentFactory);
            });
        }
    }
}