import {ErrorList} from '../../Exceptions/ErrorList';

export interface Validator {
	validate(): Promise<void | ErrorList>;
}