import {PublishStatus} from '../../../../Core/enum/PublishStatus';

export interface GetNativeLanguageDTO {
	id: string;
	name: string;
	code: string;
	nativeName: string;
	publishStatus: PublishStatus;
}
