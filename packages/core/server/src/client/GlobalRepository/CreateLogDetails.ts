import {LogGeneralDetails} from '@copor/core/domain/Core/Logger/Logger';
import {GetCurrentUTCDateRepo} from '@copor/core/domain/Core/global/SimpleDateAndTime/GetCurrentUTCDateRepo';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

export class CreateLogDetails implements LogGeneralDetails {
	private actorId: string;

	constructor(actorId: string) {
		this.actorId = actorId;
	}

	public getActionTime(): GetCurrentUTCDateRepo {
		return new CurrentUTCDate();
	}

	public getActorId(): string {
		return this.actorId;
	}
}