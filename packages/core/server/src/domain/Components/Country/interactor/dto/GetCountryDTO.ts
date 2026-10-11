import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface GetCountryDTO {
	id: string;
	name: string;
	code: string;
	publishStatus: PublishStatus;
}
