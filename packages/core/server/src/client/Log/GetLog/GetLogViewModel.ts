
export interface GetLogViewModel {
	id: string;
	actorId?: string;
	logData?: Record<string, unknown>;
	actorUserName: string;
	logType: string;
	createdAt: Date;
}
