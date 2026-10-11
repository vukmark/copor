import {Chat} from '@copor/vu_meet/client/VuMeet/types/Chat';
import {ChatUserMap} from '@copor/vu_meet/client/VuMeet/types/ChatUserMap';
import {Message} from '@copor/vu_meet/client/VuMeet/types/Message';
import {MessageSeen} from '@copor/vu_meet/client/VuMeet/types/MessageSeen';
import {MessageNotification} from '@copor/vu_meet/client/VuMeet/types/MessageNotification';

// The VuMeet module's tables, added to core's DB interface.
declare module '@copor/core/client/types/db' {
	interface DB {
		chat: Chat;
		chatUserMap: ChatUserMap;
		message: Message;
		messageSeen: MessageSeen;
		messageNotification: MessageNotification;
	}
}
