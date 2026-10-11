import {PublishStatus} from '../../../../Core/enum/PublishStatus';

export interface GetLanguageDTO {
	id: string;
	name: string;
	code: string;
	nativeName: string;
	publishStatus: PublishStatus;
}
