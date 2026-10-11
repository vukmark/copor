import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface UpdateCountryReqBodyDTO {
	id: string;
	name: string;
	code: string;
	publishStatus: PublishStatus
}
