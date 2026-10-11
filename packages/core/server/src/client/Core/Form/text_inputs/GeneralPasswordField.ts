import {RequiredField} from '@copor/core/client/Core/Form/FormField';
import {PasswordField} from '@copor/core/client/Core/Form/text_inputs/PasswordField';

export class GeneralPasswordField extends PasswordField implements RequiredField {
	getRequiredMessage(): string {
		return 'PASSWORD_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'PASSWORD';
	}

	protected getName(): string {
		return 'password';
	}
}