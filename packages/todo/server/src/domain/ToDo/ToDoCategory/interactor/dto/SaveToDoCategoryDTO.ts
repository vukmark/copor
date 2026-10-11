import {SimpleDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/entity/SimpleDate';

export interface SaveToDoCategoryDTO {
	id: string;
	name: string;
	description: string;
	createdOn: SimpleDate;
	actorId: string;
}
