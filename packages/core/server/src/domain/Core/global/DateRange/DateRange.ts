import {SimpleDate} from '../SimpleDateAndTime/entity/SimpleDate';
import {InvalidDateRangeException} from '../../Exceptions/invalid/InvalidDateRangeException';

export class DateRange {
	private startDate: SimpleDate;
	private endDate: SimpleDate;

	constructor(startDate: SimpleDate, endDate: SimpleDate) {
		this.validateDateRange(startDate, endDate);
		this.startDate = startDate;
		this.endDate = endDate;
	}

	public getStartDate(): SimpleDate {
		return this.startDate;
	}

	public getEndDate(): SimpleDate {
		return this.endDate;
	}
	private validateDateRange(startDate: SimpleDate, endDate: SimpleDate) {
		if (startDate.isAfter(endDate))
			throw new InvalidDateRangeException();
	}
}

