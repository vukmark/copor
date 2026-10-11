import {BaseController} from '../BaseController';
import {webSocketHelper} from './WebSocketHelper';

export class GetOnlineUserListController extends BaseController<void, {onlineUserIds: string[]}> {
	public getResponse(): void {
		this.response.json({onlineUserIds: webSocketHelper.getOnlineUserIds()});
	}
}
