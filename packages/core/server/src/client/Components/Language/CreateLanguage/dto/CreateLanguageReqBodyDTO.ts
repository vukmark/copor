import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface CreateLanguageReqBodyDTO {
	name: string;
	code: string;
	nativeName: string;
	publishStatus: PublishStatus;
}
