import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {CreateAiBotMessageController} from '@copor/vu_meet/client/VuMeet/AiBot/CreateAiBotMessage/CreateAiBotMessageController';

export class AiBotRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.post('/', CreateAiBotMessageController);
	}
}
