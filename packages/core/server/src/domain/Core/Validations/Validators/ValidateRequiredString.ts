import {Validator} from './Validator';

export abstract class ValidateRequiredString implements Validator {
	private readonly stringForValidation: string | undefined;
	constructor(input: string | undefined) {
		this.stringForValidation = input;
	}

	async validate(): Promise<void> {
		if (!this.stringForValidation?.trim()) {
			throw this.getErrorException();
		}
	}

	async isValid(): Promise<boolean> {
		return !!this.stringForValidation?.trim();
	}

	abstract getErrorException(): Error;
}
