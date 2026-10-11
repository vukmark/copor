import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {InvalidLatitudeRangeException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidLatitudeRangeException';

export class ValidateLatitude implements Validator {
	private readonly latitude: number | undefined;

	constructor(input: number | undefined) {
		this.latitude = input;
	}

	validate = (): Promise<void> => {
		if (this.latitude === undefined || this.latitude === null) {
			return Promise.reject(this.getErrorException());
		}

		if (this.latitude < -90 || this.latitude > 90) {
			return Promise.reject(this.getErrorException());
		}

		return Promise.resolve();
	};

	getErrorException(): Error {
		return new InvalidLatitudeRangeException();
	}
}