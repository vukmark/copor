import {BaseController} from '@copor/core/client/Core/BaseController';
import {NodemailerEmailSender} from '@copor/core/client/Core/Email/NodemailerEmailSender';
import {KyselySendQueuedEmailsRepo}
	from '@copor/core/client/Core/EmailOutbox/SendQueuedEmails/kysely/KyselySendQueuedEmailRepo';
import {SendQueuedEmails} from '@copor/core/domain/Core/EmailOutbox/interactor/SendQueuedEmails';
import {DeleteSentOldQueuedEmails} from '@copor/core/domain/Core/EmailOutbox/interactor/DeleteSentOldQueuedEmails';
import {KyselyDeleteSentOldQueuedEmailsRepo}
	from '@copor/core/client/Core/EmailOutbox/SendQueuedEmails/kysely/KyselyDeleteSentOldQueuedEmailsRepo';

export class SendQueuedEmailsController
	extends BaseController<undefined, {success: boolean}> {
	public async getResponse(): Promise<void> {
		await new SendQueuedEmails(
			{limit: 50},
			{repo: new KyselySendQueuedEmailsRepo(), emailSender: new NodemailerEmailSender()}
		).execute();

		let deletionPeriod = 30; // days

		deletionPeriod *= 24 * 60 * 60 * 1000;
		await new DeleteSentOldQueuedEmails(
			new Date(Date.now() - deletionPeriod),
			new KyselyDeleteSentOldQueuedEmailsRepo()
		).execute();

		this.response.status(200).json({
			success: true
		});
	}
}