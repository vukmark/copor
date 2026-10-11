import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';
import {SimpleDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/entity/SimpleDate';

export class LogCreateToDoCategory extends TypedLogger<LogDataForCreateToDoCategory> {
	public getType(): string {
		return 'createToDoCategory';
	}
}
export interface LogDataForCreateToDoCategory {
	id: string;
	name: string;
	createdAt: SimpleDate;
	actorId: string;
}
