import {Pipe,PipeTransform } from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
@Pipe({ name: 'safeurl' })
export class SafeUrlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(!url?'':url);
    }
}

@Pipe({ name: 'safecss' })
export class SafeCssPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(url) {
        return this.sanitizer.bypassSecurityTrustStyle(!url?'':url);
    }
}

@Pipe({ name: 'safehtml' })
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(url) {
        return this.sanitizer.bypassSecurityTrustHtml(!url?'':url);
    }
}

@Pipe({ name: 'safejs' })
export class SafeJsPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(url) {
        return this.sanitizer.bypassSecurityTrustScript(!url?'':url);
    }
}

@Pipe({ name: 'safers' })
export class SafeRsPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(!url?'':url);
    }
}