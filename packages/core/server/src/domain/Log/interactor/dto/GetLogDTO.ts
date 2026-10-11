export interface GetLogDTO {
	id: string;
	actorId?: string;
	logData?: Record<string, unknown>;
	actorUserName: string | null;
	logType: string;
	createdAt: Date;
}