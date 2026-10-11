import {MessageContentType} from '@copor/vu_meet/domain/VuMeet/Core/enum/MessageContentType';

export interface SaveMessageDTO {
	id: string;
	content: string;
	type: MessageContentType;
	extension?: string;
	sender: string;
	chat: string;
}
