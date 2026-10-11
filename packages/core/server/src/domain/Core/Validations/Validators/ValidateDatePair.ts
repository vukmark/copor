import {Validator} from './Validator';
import {SimpleDate} from '../../global/SimpleDateAndTime/entity/SimpleDate';
import {InvalidDateOrderException} from '../../Exceptions/invalid/InvalidDateOrderException';
import {InvalidDatePairException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidDatePairException';

export class ValidateDatePair implements Validator {
	private startDate: Date;
	private endDate: Date;

	public constructor(startDate: Date, endDate: Date) {
		this.startDate = startDate;
		this.endDate = endDate;
	}

	public async validate(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (this.startDate > this.endDate)
				reject(new InvalidDatePairException());
			resolve();
		});
	}
}

export class ValidateDatePairDeprecated implements Validator {
	private startDate: SimpleDate;
	private endDate: SimpleDate;

	public constructor(startDate: SimpleDate, endDate: SimpleDate) {
		this.startDate = startDate;
		this.endDate = endDate;
	}

	public async validate(): Promise<void> {
		const isAfter = await this.endDate.isAfter(this.startDate);

		if (!isAfter) {
			throw new InvalidDateOrderException();
		}
	}
}
