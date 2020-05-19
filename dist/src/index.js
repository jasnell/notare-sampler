"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _delay, _onSample, _timer;
const kDefaultSamplerOptions = {
    hz: 1,
    onSample: () => { }
};
class Sampler {
    constructor(options = kDefaultSamplerOptions) {
        _delay.set(this, void 0);
        _onSample.set(this, void 0);
        _timer.set(this, void 0);
        if (options !== undefined &&
            (typeof options !== 'object' || options === null)) {
            throw new TypeError('options must be an object');
        }
        if (options.hz !== undefined) {
            if (typeof options.hz !== 'number') {
                throw new TypeError('options.hz must be a number between 1 and 1000');
            }
            if (options.hz < 1 || options.hz > 1000) {
                throw new RangeError('options.hz must be a number between 1 and 1000');
            }
        }
        if (typeof options.onSample !== 'function') {
            throw new TypeError('options.onSample must be a function');
        }
        const opts = { ...kDefaultSamplerOptions, ...options };
        __classPrivateFieldSet(this, _onSample, opts.onSample);
        __classPrivateFieldSet(this, _delay, Math.floor(1000 / (opts.hz || kDefaultSamplerOptions.hz)));
        this.start();
    }
    start() {
        if (__classPrivateFieldGet(this, _timer) === undefined) {
            __classPrivateFieldSet(this, _timer, setInterval(() => __classPrivateFieldGet(this, _onSample).call(this), __classPrivateFieldGet(this, _delay)));
            return true;
        }
        return false;
    }
    stop() {
        if (__classPrivateFieldGet(this, _timer) !== undefined) {
            clearTimeout(__classPrivateFieldGet(this, _timer));
            __classPrivateFieldSet(this, _timer, undefined);
            return true;
        }
        return false;
    }
}
_delay = new WeakMap(), _onSample = new WeakMap(), _timer = new WeakMap();
module.exports = Sampler;
//# sourceMappingURL=index.js.map