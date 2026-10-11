import {MessageContentType} from '@copor/vu_meet/domain/VuMeet/Core/enum/MessageContentType';

export interface ValidateCreateMessageDTO {
	content: string;
	type: MessageContentType;
	sender: string;
	chat: string;
	actorId: string;
	file?: Buffer;
}
