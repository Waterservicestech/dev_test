import { ValidatorOptions } from './options/options';
import { OutputFormat } from './output/output';
import './types';
export declare function validate(emailOrOptions: string | ValidatorOptions): Promise<OutputFormat>;
export default validate;
