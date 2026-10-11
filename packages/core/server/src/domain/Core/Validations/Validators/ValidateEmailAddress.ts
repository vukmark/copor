import {InvalidEmailException} from '../../Exceptions/invalid/InvalidEmailException';
import {Validator} from './Validator';

export class ValidateEmailAddress implements Validator {
	private readonly emailAddress: string;
	private readonly emailRegex = /^[a-zA-Z0-9.+%-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	constructor(email: string) {
		this.emailAddress = email;
	}

	async validate(): Promise<void> {
		if (!this.emailRegex.test(this.emailAddress)) {
			throw new InvalidEmailException();
		}
	}

	async isValid(): Promise<boolean> {
		return this.emailRegex.test(this.emailAddress);
	}
}

