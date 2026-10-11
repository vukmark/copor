import {InvalidLongitudeRangeException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidLongitudeRangeException';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';

export class ValidateLongitude implements Validator {
	private readonly longitude: number | undefined;

	constructor(input: number | undefined) {
		this.longitude = input;
	}

	validate = (): Promise<void> => {
		if (this.longitude === undefined || this.longitude === null) {
			return Promise.reject(this.getErrorException());
		}

		if (this.longitude < -180 || this.longitude > 180) {
			return Promise.reject(this.getErrorException());
		}

		return Promise.resolve();
	};

	getErrorException(): Error {
		return new InvalidLongitudeRangeException();
	}
}