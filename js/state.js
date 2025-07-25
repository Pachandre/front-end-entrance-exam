export default class State {
    _value;
    _listeners;
    constructor(initial) {
        this._value = initial;
        this._listeners = [];
    }
    get value() {
        return this._value;
    }
    setValue(value) {
        this._value = value;
        this._listeners.forEach((listener) => listener(value));
    }
    update(updater) {
        this.setValue(updater(this._value));
    }
    listen(listener) {
        this._listeners.push(listener);
    }
    unlisten(listener) {
        const idx = this._listeners.indexOf(listener);
        if (idx === -1)
            return;
        this._listeners.splice(idx, 1);
    }
    dispose() {
        this._listeners = [];
    }
}
export class LocalStorageState extends State {
    key;
    constructor(key, defaultValue) {
        const raw = localStorage.getItem(key);
        if (raw === null) {
            super(defaultValue);
            localStorage.setItem(key, JSON.stringify(defaultValue));
        }
        else {
            super(JSON.parse(raw));
        }
        this.key = key;
    }
    setValue(value) {
        localStorage.setItem(this.key, JSON.stringify(value));
        super.setValue(value);
    }
}
export class InnerState extends State {
    _parent;
    _key;
    constructor(parentState, key) {
        super(parentState.value[key]);
        this._parent = parentState;
        this._key = key;
    }
    setValue(value) {
        super.setValue(value);
        this._parent.update((val) => ({ ...val, [this._key]: value }));
    }
    get value() {
        return this._parent.value[this._key];
    }
}
export function effect(callback, options) {
    options.deps.forEach((dep) => dep.listen(callback));
    if (options.immediate === true)
        callback();
    return () => options.deps.forEach((dep) => dep.unlisten(callback));
}
