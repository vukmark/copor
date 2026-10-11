import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface CreateCountryReqBodyDTO {
	name: string;
	code: string;
	publishStatus: PublishStatus;
}
