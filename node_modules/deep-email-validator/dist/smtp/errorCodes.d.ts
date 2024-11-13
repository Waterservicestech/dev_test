/// <reference types="node" />
export declare const ErrorCodes: {
    211: string;
    214: string;
    220: string;
    221: string;
    250: string;
    251: string;
    354: string;
    421: string;
    450: string;
    451: string;
    452: string;
    500: string;
    501: string;
    502: string;
    503: string;
    504: string;
    550: string;
    551: string;
    552: string;
    553: string;
    554: string;
};
export declare const hasCode: (message: Buffer, code: keyof typeof ErrorCodes) => boolean;
