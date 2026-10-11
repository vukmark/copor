import {FormField, RequiredField, UsePredefinedValues} from '@copor/core/client/Core/Form/FormField';
import {TextField} from '@copor/core/client/Core/Form/text_inputs/TextField';
import {SinglePasswordField} from '@copor/core/client/Core/Form/text_inputs/SinglePasswordField';
import {NumberField} from '@copor/core/client/Core/Form/number_inputs/NumberField';
import {EmailField} from '@copor/core/client/Core/Form/text_inputs/EmailField';
import {
	GetSMTPSystemSettingsDTO,
	SmtpAuthMethod,
	SmtpConnectionSecurity
} from '@copor/core/domain/SystemSettings/interactor/dto/GetSMTPSystemSettingsDTO';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {GetSystemSettingsFormPresenter} from '@copor/core/client/SystemSettings/GetSystemSettingsFormPresenter';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';

export class GetSMTPSystemSettingsFormPresenter extends GetSystemSettingsFormPresenter<GetSMTPSystemSettingsDTO> {
	getSystemSettingsType(): SystemSettingsType {
		return SystemSettingsType.SMTP;
	}

	protected getFormFields(): FormField[] {
		return [
			new SmtpEmailField(this.input.smtpEmail),
			new SmtpPasswordField(this.input.smtpPassword),
			new SmtpHostField(this.input.smtpHost),
			new SmtpPortField(this.input.smtpPort),
			new SmtpConnectionSecurityField(this.input.smtpConnectionSecurity),
			new SmtpAuthMethodField(this.input.smtpAuthMethod)
		];
	}
}

class SmtpEmailField extends EmailField implements RequiredField {
	getRequiredMessage(): string {
		return 'EMAIL_REQUIRED';
	}

	protected getLabel(): string {
		return 'SMTP_EMAIL';
	}

	protected getName(): string {
		return 'smtpEmail';
	}
}

class SmtpConnectionSecurityField extends FormField<SmtpConnectionSecurity>
	implements UsePredefinedValues<SmtpConnectionSecurity>, RequiredField {
	private readonly currentValue: NameAndIdDTO<SmtpConnectionSecurity>;

	constructor(connectionSecurity: SmtpConnectionSecurity) {
		super();
		this.currentValue = {id: connectionSecurity, name: this.getTranslation(connectionSecurity)};
	}

	getRequiredMessage(): string {
		return 'SMTP_CONNECTION_SECURITY_REQUIRED';
	}

	getValues(): NameAndIdDTO<SmtpConnectionSecurity>[] {
		return Object.values(SmtpConnectionSecurity).map((value) => ({
			id: value,
			name: this.getTranslation(value)
		}));
	}

	protected getFieldType(): FormFieldType {
		return FormFieldType.DROPDOWN;
	}

	protected getCurrentValue(): FieldValueDTO<SmtpConnectionSecurity> {
		return {dropdown: [this.currentValue]};
	}

	protected getLabel(): string {
		return 'SMTP_CONNECTION_SECURITY';
	}

	protected getName(): string {
		return 'smtpConnectionSecurity';
	}
}

class SmtpAuthMethodField extends FormField<SmtpAuthMethod>
	implements UsePredefinedValues<SmtpAuthMethod>, RequiredField {
	private readonly currentValue: NameAndIdDTO<SmtpAuthMethod>;

	constructor(authMethod: SmtpAuthMethod) {
		super();
		this.currentValue = {id: authMethod, name: this.getTranslation(authMethod)};
	}

	getRequiredMessage(): string {
		return 'SMTP_AUTH_METHOD_REQUIRED';
	}

	getValues(): NameAndIdDTO<SmtpAuthMethod>[] {
		return Object.values(SmtpAuthMethod).map((value) => ({
			id: value,
			name: this.getTranslation(value)
		}));
	}

	protected getFieldType(): FormFieldType {
		return FormFieldType.DROPDOWN;
	}

	protected getCurrentValue(): FieldValueDTO<SmtpAuthMethod> {
		return {dropdown: [this.currentValue]};
	}

	protected getLabel(): string {
		return 'SMTP_AUTH_METHOD';
	}

	protected getName(): string {
		return 'smtpAuthMethod';
	}
}

class SmtpPortField extends NumberField implements RequiredField {
	getRequiredMessage(): string {
		return 'PORT_REQUIRED';
	}

	protected getLabel(): string {
		return 'SMTP_PORT';
	}

	protected getName(): string {
		return 'smtpPort';
	}
}

class SmtpPasswordField extends SinglePasswordField implements RequiredField {
	getRequiredMessage(): string {
		return 'PASSWORD_REQUIRED';
	}

	protected getLabel(): string {
		return 'SMTP_PASSWORD';
	}

	protected getName(): string {
		return 'smtpPassword';
	}
}

class SmtpHostField extends TextField implements RequiredField {
	getRequiredMessage(): string {
		return 'HOST_REQUIRED';
	}

	protected getLabel(): string {
		return 'SMTP_HOST';
	}

	protected getName(): string {
		return 'smtpHost';
	}
}
