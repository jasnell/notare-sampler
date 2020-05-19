# notare-monitor -- Node.js observer

Extracted from the `notare` module, `notare-sampler` provides
a simple way of firing an event at a given HZ (ticks per second).

(essentially it's a just a timer that fires an approximate given
number of times per second)

## Example

```js
const { Sampler } = require('notare-sampler');

const sampler = new Sampler({
  hz: 2,
  onSample() {
    console.log('.');
  }
});
```

## API

### Constructor:  `Sampler([options])`

Create a new `'Sampler` object.

* `options` (`object`)
  * `hz`: (`number`) An integer between 1 and 1000 that specifies the number
    of samples per second the `Monitor` should generate. The higher this
    number, the greater the performance impact the `Monitor` will have.
    The default is `2`.
* `onSample`: (`function`) The function that is invoked.
