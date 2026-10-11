import {LogForSave} from './LogForSave';
import {LogRepository} from './LogRepository';
import {GetCurrentUTCDateRepo} from '../global/SimpleDateAndTime/GetCurrentUTCDateRepo';
import {LogAction} from './LogAction';
import {CurrentUTCDate} from '../global/SimpleDateAndTime/interactor/CurrentUTCDate';

export interface LogGeneralDetails {
	getActorId(): string;

	getActionTime(): GetCurrentUTCDateRepo;
}

export class LogDetails implements LogGeneralDetails {
	private actorId: string;

	constructor(actorId: string) {
		this.actorId = actorId;
	}

	public getActorId(): string {
		return this.actorId;
	}

	public getActionTime(): GetCurrentUTCDateRepo {
		return new CurrentUTCDate();
	}
}

export abstract class TypedLogger<LogData> implements LogAction {
	protected repo: LogRepository<LogData>;
	protected logData: LogData;
	private logDetails: LogGeneralDetails;

	constructor(repo: LogRepository<LogData>, logDetails: LogGeneralDetails, logData: LogData) {
		this.repo = repo;
		this.logDetails = logDetails;
		this.logData = logData;
	}

	public async log(): Promise<void> {
		const forLog: LogForSave<LogData> = {
			actionTime: this.logDetails.getActionTime(),
			actorUserId: this.logDetails.getActorId(),
			actionType: this.getType(),
			logData: this.getLogData()
		};

		await this.repo.save(forLog);
	}

	getLogData(): LogData {
		return this.logData;
	}

	abstract getType(): string;
}