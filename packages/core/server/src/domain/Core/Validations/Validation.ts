import {Validator} from './Validators/Validator';
import {ErrorList} from '../Exceptions/ErrorList';

export abstract class Validation<InputForValidation> implements Validator {
	protected readonly input: InputForValidation;

	constructor(input: InputForValidation) {
		this.input = input;
	}

	public async validate(): Promise<void | ErrorList> {
		const validators = this.getValidators();
		const errorList: Error[] = [];

		await Promise.allSettled(validators.map((validator) => validator.validate())).then((results) => {
			results.forEach((result) => {
				if (result.status === 'rejected' && result.reason instanceof Error) {
					errorList.push(result.reason);
				}
			});
		});
		if (errorList.length !== 0) {
			return new ErrorList(errorList);
		}
	}

	public abstract getValidators(): Validator[];
}

