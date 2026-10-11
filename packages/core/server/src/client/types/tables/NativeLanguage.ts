import {Generated} from './Generated';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface NativeLanguage {
	id: string;
	code: string;
	name: string;
	nativeName: string;
	createdAt: Generated<Date>;
	createdBy: string;
	modifiedAt: Generated<Date>;
	modifiedBy: string;
	publishStatus: PublishStatus
}
