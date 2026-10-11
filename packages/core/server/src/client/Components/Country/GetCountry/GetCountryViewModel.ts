import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface GetCountryViewModel {
	id: string;
	name: string;
	code: string;
	publishStatus: PublishStatus;
}
