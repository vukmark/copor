import {PublishStatus} from '../../../../Core/enum/PublishStatus';

export interface ValidateCreateNativeLanguageDTO {
	name: string;
	code: string;
	nativeName: string;
	publishStatus: PublishStatus;
	actorId: string;
}