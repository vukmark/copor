import {GetCurrentUTCDateRepo} from '../global/SimpleDateAndTime/GetCurrentUTCDateRepo';

export interface LogForSaveWithNoData {
	actorUserId: string;
	actionTime: GetCurrentUTCDateRepo;
	actionType: string;
}
