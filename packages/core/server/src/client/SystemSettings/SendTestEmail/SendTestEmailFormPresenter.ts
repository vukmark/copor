import {FormField, RequiredField} from '@copor/core/client/Core/Form/FormField';
import {TextBoxField} from '@copor/core/client/Core/Form/text_inputs/TextBoxField';
import {TextField} from '@copor/core/client/Core/Form/text_inputs/TextField';
import {SendTestEmailDTO} from '@copor/core/client/SystemSettings/SendTestEmail/SendTestEmailController';
import {GetSystemSettingsFormPresenter} from '@copor/core/client/SystemSettings/GetSystemSettingsFormPresenter';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';

export class SendTestEmailFormPresenter extends GetSystemSettingsFormPresenter<SendTestEmailDTO> {
	getSystemSettingsType(): SystemSettingsType {
		return SystemSettingsType.SMTP_TEST;
	}

	protected getEndpoint(): string {
		return '/system-settings/smtp/test';
	}

	protected getFormFields(): FormField[] {
		return [
			new TestEmailReceiverField(''),
			new TestEmailMessageField('')
		];
	}
}

class TestEmailReceiverField extends TextField implements RequiredField {
	getRequiredMessage(): string {
		return 'RECEIVER_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'RECEIVER';
	}

	protected getName(): string {
		return 'receiver';
	}
}

class TestEmailMessageField extends TextBoxField implements RequiredField {
	getRequiredMessage(): string {
		return 'MESSAGE_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'MESSAGE';
	}

	protected getName(): string {
		return 'message';
	}
}