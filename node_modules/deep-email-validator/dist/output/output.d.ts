import { ElementType } from '../types';
declare const OrderedLevels: readonly ["regex", "typo", "disposable", "mx", "smtp"];
export declare type SubOutputFormat = {
    valid: boolean;
    reason?: string;
};
declare type Level = ElementType<typeof OrderedLevels>;
export declare type OutputFormat = SubOutputFormat & {
    validators: {
        [K in Level]?: SubOutputFormat;
    };
};
export declare const createOutput: (failLevel?: "regex" | "typo" | "disposable" | "mx" | "smtp" | undefined, failReason?: string | undefined) => OutputFormat;
export {};
