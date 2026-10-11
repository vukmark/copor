import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {ChatRouter} from '../Chat/router/ChatRouter';
import {MessageRouter} from '../Message/router/MessageRouter';
import {GetUserChatListController} from '../Core/GetUserChatList/GetUserChatListController';
import {GetVuMeetContactListController} from '@copor/vu_meet/client/VuMeet/Core/GetVuMeetContactList/GetVuMeetContactListController';
import {SearchAllMessagesController} from '../Core/SearchAllMessages/SearchAllMessagesController';
import {AiBotRouter} from '@copor/vu_meet/client/VuMeet/AiBot/router/AiBotRouter';

export class VuMeetRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.nextRouter('/chat', ChatRouter);
		this.nextRouter('/message', MessageRouter);
		this.nextRouter('/bot', AiBotRouter);
		this.get('/user-chats/:prompt', GetUserChatListController);
		this.get('/user-chats/', GetUserChatListController);
		this.post('/contacts', GetVuMeetContactListController);
		this.get('/search/:prompt', SearchAllMessagesController);
		this.get('/search', SearchAllMessagesController);
	}
}
