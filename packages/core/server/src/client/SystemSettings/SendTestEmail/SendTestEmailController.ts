import {BaseController} from '@copor/core/client/Core/BaseController';
import {Emailer} from '@copor/core/client/Core/Email/Emailer';
import {SendTestEmail} from '@copor/core/client/Core/Email/Templates/SendTestEmail';
import i18next from 'i18next';

export interface SendTestEmailDTO {
	receiver: string;
	message: string;
}

export class SendTestEmailController extends BaseController<SendTestEmailDTO, string> {
	async getResponse(): Promise<void> {
		const {receiver, message} = this.request.body;

		i18next.setDefaultNamespace('common');

		const success = i18next.t('translationStringList.EMAIL_SENT_SUCCESSFULLY');
		const fail = i18next.t('translationStringList.EMAIL_SEND_FAILED');

		try {
			const emailer = new Emailer();
			const email = new SendTestEmail({
				body: message,
				receiver: receiver
			});

			await emailer.sendEmail(email);

			this.response.status(200);
			this.response.send(success);
		} catch (error) {
			this.next(new Error(fail));
		}
	}
}