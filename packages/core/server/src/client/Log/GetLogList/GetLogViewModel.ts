export interface GetLogViewModel {
	id: string;
	actorId?: string;
	actorUserName: string | null;
	logData?: Record<string, unknown>,
	logType: string;
	createdAt: Date;
}