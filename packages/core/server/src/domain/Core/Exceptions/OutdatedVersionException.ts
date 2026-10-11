export class OutdatedVersionException extends Error {
	constructor(message?: string) {
		super(message ?? 'OutdatedVersionException');
		this.name = 'OutdatedVersionException';
	}
}
