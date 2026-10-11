import {Generated} from '@copor/core/client/types/tables/Generated';

export interface Chat {
	id: string;
	isPrivate: Generated<boolean>;
	lastMessage: Generated<string>;
	lastMessageType: Generated<string>;
	lastMessageSentBy: string | null;
	lastMessageSentTime: Generated<Date | null>;
	name: Generated<string>;
	picture: Generated<string>;
}
