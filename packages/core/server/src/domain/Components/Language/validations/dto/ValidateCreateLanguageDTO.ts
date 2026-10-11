import {PublishStatus} from '../../../../Core/enum/PublishStatus';

export interface ValidateCreateLanguageDTO {
	name: string;
	code: string;
	nativeName: string;
	publishStatus: PublishStatus;
	actorId: string;
}