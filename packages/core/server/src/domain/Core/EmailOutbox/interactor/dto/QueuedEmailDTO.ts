export interface QueuedEmailDTO {
	id: string;
	type: string;
	receiver: string;
	subject: string;
	payload: string;
	attempts: number;
}