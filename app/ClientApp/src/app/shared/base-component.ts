import { Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Rx';

export abstract class BaseComponent implements OnDestroy {
    private _id: string;
    private _name: string;

    protected _destructor$: Subject<boolean> = new Subject();
    @Input()
    get id() { return this._id; }
    set id(value: string) {
        this._id = value;
    }

    @Input()
    get name() { return this._name; }
    set name(value: string) {
        this._name = value;
    }

    constructor() { }
    ngOnDestroy() {
        this._destructor$.next(true);
        this._destructor$.unsubscribe();
    }
}
