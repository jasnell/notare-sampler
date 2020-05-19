type SampleCallback = () => void;

interface SamplerOptions {
  hz? : number,
  onSample : SampleCallback;
}

interface FilledSamplerOptions extends SamplerOptions {
  hz : number,
  onSample : SampleCallback
}

const kDefaultSamplerOptions : FilledSamplerOptions = {
  hz: 2,
  onSample : () => {}
};

class Sampler {
  #delay : number;
  #onSample : SampleCallback;
  #timer? : NodeJS.Timeout;

  constructor (options : SamplerOptions = kDefaultSamplerOptions) {
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
    this.#onSample = opts.onSample;
    this.#delay = Math.floor(1000 / (opts.hz || kDefaultSamplerOptions.hz));
    this.start();
  }

  start() : boolean {
    if (this.#timer === undefined) {
      this.#timer = setInterval(() => this.#onSample(), this.#delay);
      return true;
    }
    return false;
  }

  stop() : boolean {
    if (this.#timer !== undefined) {
      clearTimeout(this.#timer);
      this.#timer = undefined;
      return true;
    }
    return false;
  }
}

export = Sampler;
