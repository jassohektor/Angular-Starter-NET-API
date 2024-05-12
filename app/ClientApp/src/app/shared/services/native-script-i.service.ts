import { EventEmitter, Injectable } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { partial } from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class NativeScriptIService {
    public oWebViewInterface: any;
    public nsService = new EventEmitter<any>();

    public get isEdge() {
        return (
            /MSIE 10/i.test(navigator.userAgent) ||
            /MSIE 9/i.test(navigator.userAgent) ||
            /rv:11.0/i.test(navigator.userAgent) ||
            /Edge\/\d./i.test(navigator.userAgent)
        )
    }

    constructor(private _router: Router) {
        if (!window['isHybridApp']) return;
        this.oWebViewInterface = window['nsWebViewInterface'];
        this.defineNativeInterfaceFunctions();
        this.addNativeListener();
        if (!this.isEdge) {
            setTimeout(() => {
                document.body.onload = function() {
                    <any>window['nsWebViewInterface'].emit('onload');
                };
            }, 500);
        }
        /// setInterval(() => <any>window['nsWebViewInterface'].emit('testing', { test: 123 }), 2000);
        //}
    }

    public nsEventEmitter(event: any) {
        if (!window['isHybridApp']) return;
        if (!this.isEdge) {
            <any>window['nsWebViewInterface'].emit(event.type, event.object);
        }
    }

    public emit(name, data) {
        if (!this.isEdge) {
            window['nsWebViewInterface'].emit(name, data);
        }
    }

    public nsEventLister(event: any, success: Function, fallback: Function) {
        if (!window['isHybridApp']) return;
        let that = event.object;

        <any>window['nsWebViewInterface'].on(
            event.type,
            function(event) {
                success(that, event);
            },
            function(event) {
                fallback(that, event);
            }
        );
    }

    public nsEventRemove(event: any) {

        <any>window['nsWebViewInterface'].off(event.type);
    }

    public onLoginLoad(value) {
        //if (!window['isHybridApp']) return;
        this.emit('onLoginLoad', value);
    }

    /**
     * Registers handlers for native events.
     */
    public addNativeListener() {
        if (!window['isHybridApp']) return;
        // debugger;
        window['nsWebViewInterface'].on('loadSettingsNS', this.nsSettings(this));
        window['nsWebViewInterface'].on('loadUserPreferencesNS', this.nsUserPreferences(this));

        window['nsWebViewInterface'].on('nsroute', (url) => {
            //if (!window['isHybridApp']) return;
            this._router.navigateByUrl(url);
            //this._cdr.detectChanges();
            console.log('nsroute changed' + url);
        });
        this._router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.emit('NavigationStart', event);
            }

            if (event instanceof NavigationEnd) {
                this.emit('NavigationEnd', event);
            }
        });

    }

    public nsSettings(that) {
        return function(obj) {//if (!window['isHybridApp']) return;
            that.layoutActions.setHeaderDisplay(false);
            console.log('loading NS settings', obj);
        }
    }

    public nsUserPreferences(that) {
        return function (obj) {//if (!window['isHybridApp']) return;
            that.layoutActions.setHeaderDisplay(false);
            console.log('loading NS user preferences', obj);
        }
    }

    /**
     * Defines global functions which will be called from andorid/ios
     */
    public defineNativeInterfaceFunctions() {
        //if (!window['isHybridApp']) return;

        window['getRequestHeaders'] = function(value) {
            console.log('NativeScript sent values - ' + JSON.stringify(window['requestHeaders']));
            return window['requestHeaders'];
        };

        window['getSettingNS'] = (value) => {
            //this.layoutActions.setHeaderDisplay(false);
            console.log('NativeScript sent values - ' + value);
        };
    }

    /**
     * Defines functions which will be dispatchs event to nativescript from andorid/ios
     */
    public sendSettingsValue2NS(value) {
        if (!window['isHybridApp']) return;
        this.emit('settingsChanged', value);
    }
}
