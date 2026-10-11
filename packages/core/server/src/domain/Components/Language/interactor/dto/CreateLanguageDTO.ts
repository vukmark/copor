import {PublishStatus} from '../../../../Core/enum/PublishStatus';

export interface CreateLanguageDTO {
	name: string;
	code: string;
	nativeName: string;
	publishStatus: PublishStatus;
	actorId: string;
}