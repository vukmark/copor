import {BaseEmail} from '@copor/core/client/Core/Email/BaseEmail';
import {PasswordResetCodeEmailDTO} from '@copor/core/domain/Core/global/Email/dto/PasswordResetCodeEmailDTO';
import i18next from 'i18next';

export class PasswordResetCodeEmail extends BaseEmail<PasswordResetCodeEmailDTO> {
	getReceiver(): string {
		return this.input.receiver;
	}
	getSubject(): string {
		i18next.setDefaultNamespace('default');
		return i18next.t('translationStringList.PASSWORD_RESET_CODE_EMAIL_TITLE');
	}
	getContent(): string {
		i18next.setDefaultNamespace('default');
		return i18next.t('translationStringList.PASSWORD_RESET_CODE_EMAIL', {
			userName: this.input.userName ?? '',
			resetCode: this.input.resetCode,
			interpolation: {escapeValue: false}
		});
	}
}