import {BaseEmail} from '@copor/core/client/Core/Email/BaseEmail';
import {RegistrationCodeEmailDTO} from '@copor/core/domain/Core/global/Email/dto/RegistrationCodeEmailDTO';
import i18next from 'i18next';

export class RegistrationCodeEmail extends BaseEmail<RegistrationCodeEmailDTO> {
	getReceiver(): string {
		return this.input.receiver;
	}
	getSubject(): string {
		i18next.setDefaultNamespace('default');
		return i18next.t('translationStringList.REGISTRATION_CODE_EMAIL_TITLE');
	}
	getContent(): string {
		i18next.setDefaultNamespace('default');
		return i18next.t('translationStringList.REGISTRATION_CODE_EMAIL', {
			firstName: this.input.firstName,
			verificationCode: this.input.verificationCode,
			interpolation: {escapeValue: false}
		});
	}
}
