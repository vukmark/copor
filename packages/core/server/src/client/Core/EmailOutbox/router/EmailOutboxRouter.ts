import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {CreateQueuedEmailController} from '@copor/core/client/Core/EmailOutbox/CreateQueuedEmail/CreateQueuedEmailController';
import {SendQueuedEmailsController} from '@copor/core/client/Core/EmailOutbox/SendQueuedEmails/SendQueuedEmailsController';

export class EmailOutboxRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.post('/', CreateQueuedEmailController);
		this.post('/send', SendQueuedEmailsController);
	}
}