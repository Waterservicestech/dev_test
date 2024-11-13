import dns from 'dns';
export declare const getMx: (domain: string) => Promise<dns.MxRecord[]>;
export declare const getBestMx: (domain: string) => Promise<dns.MxRecord | undefined>;
