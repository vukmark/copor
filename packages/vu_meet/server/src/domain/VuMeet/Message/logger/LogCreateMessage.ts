import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';
import {MessageContentType} from '@copor/vu_meet/domain/VuMeet/Core/enum/MessageContentType';


export class LogCreateMessage extends TypedLogger<LogDataForCreateMessage> {
	getType(): string {
		return 'createMessage';
	}
}
export interface LogDataForCreateMessage {
	id: string;
	type: MessageContentType;
	chat: string;
}
