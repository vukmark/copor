import {Generated} from '@copor/core/client/types/tables/Generated';
import {MessageContentType} from '@copor/vu_meet/domain/VuMeet/Core/enum/MessageContentType';

export interface Message {
	id: string;
	chatId: string | null;
	content: string;
	extension: string | null;
	seen: boolean;
	senderId: string | null;
	type: MessageContentType;
	createdAt: Generated<Date>;
	createdBy: string;
	modifiedAt: Generated<Date>;
	modifiedBy: string;
}
