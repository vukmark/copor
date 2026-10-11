export interface CreateQueuedEmailReqBodyDTO {
	type: string;
	receiver: string;
	subject?: string;
	payload: unknown;
}
