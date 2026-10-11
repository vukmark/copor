import {MessageContentType} from '@copor/vu_meet/domain/VuMeet/Core/enum/MessageContentType';

export interface CreateMessageReqBodyDTO {
	content: string;
	type: MessageContentType;
	chat: string;
}
