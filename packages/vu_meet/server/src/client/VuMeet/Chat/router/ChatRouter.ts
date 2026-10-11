import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {
	SendChatTypingStatusController
} from '../../Core/SendChatTypingStatus/SendChatTypingStatusController';
import {GetChatWithUserController} from '../GetChatWithUser/GetChatWithUserController';
import {
	MarkChatMessagesSeenController
} from '../MarkChatMessagesSeen/MarkChatMessagesSeenController';
import {
	HandleCallActionController
} from '@copor/vu_meet/client/VuMeet/Chat/HandleCallAction/HandleCallActionController';
import {GetChatInfoController} from '@copor/vu_meet/client/VuMeet/Chat/GetChatInfo/GetChatInfoController';
import {DeclineCallController} from '@copor/vu_meet/client/VuMeet/Chat/DeclineCall/DeclineCallController';
import {UpdateChatController} from '@copor/vu_meet/client/VuMeet/Chat/UpdateChat/UpdateChatController';

export class ChatRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.post('/typing-status', SendChatTypingStatusController);
		this.post('/call', HandleCallActionController);
		this.post('/decline-call', DeclineCallController);
		this.get('/info/:id', GetChatInfoController);
		this.post('/user', GetChatWithUserController);
		this.patch('/', UpdateChatController);
		this.get('/mark-seen/:chatId', MarkChatMessagesSeenController);
	}
}
