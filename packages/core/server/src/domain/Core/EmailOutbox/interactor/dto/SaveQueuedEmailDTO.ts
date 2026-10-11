export interface SaveQueuedEmailDTO {
	id: string;
	type: string;
	receiver: string;
	subject?: string;
	payload: unknown;
	actorId: string;
	priority?: number;
}