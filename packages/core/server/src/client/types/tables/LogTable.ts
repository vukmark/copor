import {Generated} from './Generated';

export interface LogTable {
	id: string;
	actorId: string | null;
	logData: string | null;
	logType: string;
	createdAt: Generated<Date>;
}
