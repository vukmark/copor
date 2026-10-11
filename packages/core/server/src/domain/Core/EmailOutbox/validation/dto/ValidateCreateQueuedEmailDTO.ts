export interface ValidateCreateQueuedEmailDTO {
	type: string;
	receiver: string;
	payload: unknown;
	actorId: string;
}