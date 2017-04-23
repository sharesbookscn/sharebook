/*
 * Angular bootstraping
 */
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {decorateModuleRef} from './app/environment';
import {bootloader} from '@angularclass/hmr';
/*
 * App Module
 * our top level module that holds all of our components
 */
import {AppModule} from './app/app.module';

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
    return platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .then(decorateModuleRef)
        .catch(err => console.error(err));
}

// needed for hmr
// in prod this is replace for document ready
console.log(window['device']);
if(!window['device']){
    bootloader(main);
}else{
    document.addEventListener("deviceready", function () {
        window.codePush.sync(syncStatus, null, downloadProgress);
        bootloader(main);
    }, false);
}


function syncStatus(status) {
    switch (status) {
        case  window.SyncStatus.DOWNLOADING_PACKAGE:
            // Show "downloading" modal
            break;
        case window.SyncStatus.INSTALLING_UPDATE:
            // Hide "downloading" modal
            break;
    }
}

function downloadProgress(downloadProgress) {
    if (downloadProgress) {
        console.log(downloadProgress);
        // Update "downloading" modal with current download %
        //console.log("Downloading " + downloadProgress.receivedBytes + " of " + downloadProgress.totalBytes);
    }
}

