import {NoDataLogRepository} from './NoDataLogRepository';
import {LogForSaveWithNoData} from './LogForSaveWithNoData';
import {LogAction} from './LogAction';
import {LogGeneralDetails} from './Logger';

export abstract class NoDataLogger implements LogAction {
	protected repository: NoDataLogRepository;
	protected logDetails: LogGeneralDetails;
	constructor(repository: NoDataLogRepository, logDetails: LogGeneralDetails) {
		this.repository = repository;
		this.logDetails = logDetails;
	}
	public async log(): Promise<void> {
		const forLog: LogForSaveWithNoData = {
			actionTime: this.logDetails.getActionTime(),
			actorUserId: this.logDetails.getActorId(),
			actionType: this.getType()
		};

		await this.repository.save(forLog);
	}
	abstract getType(): string;
}
