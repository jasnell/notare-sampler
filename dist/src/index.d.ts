declare type SampleCallback = () => void;
interface SamplerOptions {
    hz?: number;
    onSample: SampleCallback;
}
declare class Sampler {
    #private;
    constructor(options?: SamplerOptions);
    start(): boolean;
    stop(): boolean;
}
export = Sampler;
