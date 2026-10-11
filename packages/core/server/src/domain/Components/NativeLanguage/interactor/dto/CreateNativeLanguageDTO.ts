import {PublishStatus} from '../../../../Core/enum/PublishStatus';

export interface CreateNativeLanguageDTO {
	name: string;
	code: string;
	nativeName: string;
	publishStatus: PublishStatus;
	actorId: string;
}