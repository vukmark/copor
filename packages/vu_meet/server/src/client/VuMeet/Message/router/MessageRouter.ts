import {vuMeetMaxFileSizeMb} from '@copor/vu_meet/client/VuMeet/VuMeetConfig';
import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {CreateMessageController} from '../CreateMessage/CreateMessageController';
import {GetMessageListController} from '../GetMessageList/GetMessageListController';
import {SearchMessagesInChatController}
	from '../SearchMessagesInChat/SearchMessagesInChatController';
import {MulterFileMiddleware} from '@copor/core/client/Core/Middleware/MulterImageMiddleware';
import {GetVuMeetFileController} from '@copor/vu_meet/client/VuMeet/Message/GetVuMeetFile/GetVuMeetFileController';

export class MessageRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.router.post(
			'/',
			MulterFileMiddleware.single(this.container.appContext, 'file', vuMeetMaxFileSizeMb(this.container.appContext)),
			(req, res, next) => {
				const controller = new CreateMessageController(this.container, req, res, next);

				void controller.getResponse();
			}
		);
		this.get('/file/:id', GetVuMeetFileController);
		this.post('/list', GetMessageListController);
		this.post('/search', SearchMessagesInChatController);
	}
}
