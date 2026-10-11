export abstract class CoporDateFormatter {
	private date: Date;
	private languageCode: string;

	constructor(date: Date, languageCode: string) {
		this.date = date;
		this.languageCode = languageCode;
	}

	format(): string {
		return Intl.DateTimeFormat(this.languageCode, this.getFormat()).format(this.date);
	}

	protected abstract getFormat(): Intl.DateTimeFormatOptions;
}