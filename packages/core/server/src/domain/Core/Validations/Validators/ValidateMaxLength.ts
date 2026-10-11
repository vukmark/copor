import {Validator} from './Validator';
import {ContentTooLongException} from '../../Exceptions/invalid/ContentTooLongException';

export class ValidateMaxLength implements Validator {
	private readonly value: string;
	private readonly maxLength: number;

	constructor(value: string, maxLength: number) {
		this.value = value;
		this.maxLength = maxLength;
	}

	async validate(): Promise<void> {
		if (this.value.length > this.maxLength)
			throw new ContentTooLongException();
	}
}
