import {CoporDateFormatter} from '@copor/core/domain/Core/Date/CoporDateFormatter';

export class SimpleDateFormat extends CoporDateFormatter {
	protected getFormat(): Intl.DateTimeFormatOptions {
		return {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		};
	}
}