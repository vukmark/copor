import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface CreateNativeLanguageReqBodyDTO {
	name: string;
	code: string;
	nativeName: string;
	publishStatus: PublishStatus;
}
