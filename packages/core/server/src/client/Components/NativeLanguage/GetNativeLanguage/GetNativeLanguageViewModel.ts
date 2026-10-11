import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface GetNativeLanguageViewModel {
	id: string;
	name: string;
	code: string;
	nativeName: string;
	publishStatus: PublishStatus;
}
