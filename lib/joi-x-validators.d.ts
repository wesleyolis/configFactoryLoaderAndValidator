import * as JoiX from './joi-x';
export interface Port extends JoiX.XNumberSchema {
}
export declare enum DPorts {
    Undefined = -1,
    Mongo = 27017,
}
export declare const port: (port?: DPorts) => Port;
