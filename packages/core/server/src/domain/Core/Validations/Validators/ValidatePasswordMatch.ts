import {Validator} from './Validator';
import {ErrorList} from '../../Exceptions/ErrorList';
import {PasswordNotMatchException} from '@copor/core/domain/Core/Exceptions/invalid/PasswordNotMatchException';

export class ValidatePasswordMatch implements Validator {
	private readonly password: string;
	private readonly confirmPassword: string;

	constructor(input: {
		password: string,
		confirmPassword: string,
	}) {
		this.password = input.password;
		this.confirmPassword = input.confirmPassword;
	}

	validate(): Promise<void | ErrorList> {
		return new Promise((resolve, reject) => {
			if (this.confirmPassword === '') {
				resolve();
				return;
			}
			if (this.password !== this.confirmPassword) {
				reject(new PasswordNotMatchException());
			}
			resolve();
		});
	}
}
