import {CoporDateFormatter} from '@copor/core/domain/Core/Date/CoporDateFormatter';

export class FullDateFormat extends CoporDateFormatter {
	protected getFormat(): Intl.DateTimeFormatOptions {
		return {
			year: 'numeric',
			month: 'long',
			day: '2-digit',
			weekday: 'long'
		};
	}
}