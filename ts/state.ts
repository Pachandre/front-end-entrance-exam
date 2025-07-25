type IListenable<T> = {
    listen(listener: (value: T) => any): void;
    unlisten(listener: (value: T) => any): void;
};

export default class State<T> implements IListenable<T> {
    private _value: T;
    private _listeners: ((value: T) => any)[];

    constructor(initial: T) {
        this._value = initial;
        this._listeners = [];
    }

    get value(): T {
        return this._value;
    }
    protected setValue(value: T) {
        this._value = value;
        this._listeners.forEach((listener) => listener(value));
    }
    update(updater: (old: T) => T): void {
        this.setValue(updater(this._value));
    }
    listen(listener: (value: T) => any): void {
        this._listeners.push(listener);
    }
    unlisten(listener: (value: T) => any): void {
        const idx = this._listeners.indexOf(listener);
        if (idx === -1) return;
        this._listeners.splice(idx, 1);
    }
    dispose() {
        this._listeners = [];
    }
}

export class LocalStorageState<
    T extends object | number | string | boolean
> extends State<T> {
    private key: string;

    constructor(key: string, defaultValue: T) {
        const raw = localStorage.getItem(key);
        if (raw === null) {
            super(defaultValue);
            localStorage.setItem(key, JSON.stringify(defaultValue));
        } else {
            super(JSON.parse(raw) as T);
        }
        this.key = key;
    }
    protected setValue(value: T) {
        localStorage.setItem(this.key, JSON.stringify(value));
        super.setValue(value);
    }
}

export class InnerState<P extends object, K extends keyof P> extends State<
    P[K]
> {
    private _parent: State<P>;
    private _key: K;

    constructor(parentState: State<P>, key: K) {
        super(parentState.value[key]);
        this._parent = parentState;
        this._key = key;
    }

    protected setValue(value: P[K]): void {
        super.setValue(value);
        this._parent.update((val) => ({ ...val, [this._key]: value }));
    }

    get value() {
        return this._parent.value[this._key];
    }
}

export function effect(
    callback: () => any,
    options: { deps: IListenable<any>[]; immediate?: boolean }
): () => void {
    options.deps.forEach((dep) => dep.listen(callback));
    if (options.immediate === true) callback();
    return () => options.deps.forEach((dep) => dep.unlisten(callback));
}
