import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface SaveNativeLanguageDTO {
	id: string;
	name: string;
	code: string;
	nativeName: string;
	publishStatus: PublishStatus;
	actorId: string;
}