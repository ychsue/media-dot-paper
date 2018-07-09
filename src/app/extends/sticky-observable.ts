import { Observable, Subject, Subscriber, TeardownLogic } from 'rxjs';

export class StickyObservable<T> extends Observable<T> {
    private _state = stickyObservableState.none;
    public get state(): stickyObservableState {
        return this._state;
    }

    private _subject = new Subject<T>();

    constructor(fn: (subscriber: Subscriber<T>) => TeardownLogic) {
        super((observer) => {
            const self = this;
            if (this.state === stickyObservableState.fired) {
                observer.next(null);
                this._subject.subscribe(val => {
                    observer.next(val);
                });
            } else if (this.state === stickyObservableState.noneFired) {
                this._subject.subscribe(val => {
                    observer.next(val);
                    this._state = stickyObservableState.fired;
                });
            } else if (this.state === stickyObservableState.none) {
                const bufOb = new Observable<T>(fn);
                bufOb.subscribe(this._subject);
                const bufSub = bufOb.subscribe((val) => {
                    self._state = stickyObservableState.fired;
                    bufSub.unsubscribe();
                });
                this._state = stickyObservableState.noneFired;
                return fn(observer);
            }
        });
    }

    static dressObservable<T>(ob: Observable<T>): StickyObservable<T> {
        const me = new StickyObservable<T>((observer) => {
            ob.subscribe((val) => {
                observer.next(val);
            });
        });
        return me;
    }
}

export enum stickyObservableState {
    none,
    noneFired,
    fired
}
