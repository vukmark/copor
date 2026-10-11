import {GetCurrentUTCDateRepo} from '../global/SimpleDateAndTime/GetCurrentUTCDateRepo';

export interface LogForSave<LogData> {
	actorUserId: string;
	actionTime: GetCurrentUTCDateRepo;
	actionType: string;
	logData: LogData;
}