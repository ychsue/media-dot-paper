import { Observable, Subject, Subscriber, TeardownLogic, Subscription } from 'rxjs';

export class StickyObservable<T> extends Observable<T> {
    private _state = stickyObservableState.none;
    public get state(): stickyObservableState {
        return this._state;
    }

    private _subject = new Subject<T>();
    private _1stOb: Subscriber<T>;

    constructor(fn: (subscriber: Subscriber<T>) => TeardownLogic) {
        super((observer) => {
            const self = this;
            let sub: Subscription;
            if (this.state === stickyObservableState.fired) {
                observer.next(null);
                sub = this._subject.subscribe(observer);
            } else if (this.state === stickyObservableState.noneFired) {
                sub = this._subject.subscribe(observer);
            } else if (this.state === stickyObservableState.none) {
                if (!!self._1stOb === false) {
                    self._1stOb = observer;
                    sub = self.subscribe(self._subject);
                    this._state = stickyObservableState.noneFired;
                } else {
                    sub = self._subject.subscribe(self._1stOb);
                    const buf = self._subject.subscribe(() => {
                        self._state = stickyObservableState.fired;
                        buf.unsubscribe();
                    });
                    return fn(observer); // well, once you unsubscribe the 1st one, it will execute the original TeardownLogic.
                    // therefore, if you create this observable from ~dressObservable~, it will unsubscribe it from original observable.
                }
            }
            return () => {
                sub.unsubscribe();
            };
        });
    }

    static createWithInit<T>(fn: (subscriber: Subscriber<T>) => TeardownLogic) {
        const result = new StickyObservable(fn);

        result.subscribe();
        return result;
    }

    static dressObservable<T>(ob: Observable<T>): StickyObservable<T> {
        const me = new StickyObservable<T>((observer) => {
            const sub = ob.subscribe(observer);
            return () => {
                sub.unsubscribe();
            };
        });
        return me;
    }
}

export enum stickyObservableState {
    none,
    noneFired,
    fired
}
