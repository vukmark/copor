import {BaseEmail} from '../BaseEmail';
import i18next from 'i18next';
import {SendTestEmailDTO} from '@copor/core/domain/Core/global/Email/dto/SendTestEmailDTO';

export class SendTestEmail extends BaseEmail<SendTestEmailDTO> {
	getReceiver(): string {
		return this.input.receiver;
	}

	getSubject(): string {
		i18next.setDefaultNamespace('default');
		const subject: string = i18next.t('translationStringList.TEST_EMAIL_SUBJECT', {
			dateTime: new Date().toLocaleString('de-DE')
		});

		return subject;
	}

	getContent(): string {
		i18next.setDefaultNamespace('default');
		const content: string = i18next.t('translationStringList.TEST_EMAIL', {
			body: this.input.body
		});

		return content;
	}
}
