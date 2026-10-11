import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface GetStateViewModel {
	id: string;
	name: string;
	code: string;
	countryId: string;
	publishStatus: PublishStatus;
}