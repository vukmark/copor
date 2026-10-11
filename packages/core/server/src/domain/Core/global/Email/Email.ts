export interface Email {
	getReceiver(): string;
	getSubject(): string;
	getContent(): string;
}
