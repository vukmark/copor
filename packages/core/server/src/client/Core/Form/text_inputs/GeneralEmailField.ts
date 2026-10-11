import {EmailField} from '@copor/core/client/Core/Form/text_inputs/EmailField';
import {RequiredField} from '@copor/core/client/Core/Form/FormField';

export class GeneralEmailField extends EmailField implements RequiredField {
	getRequiredMessage(): string {
		return 'EMAIL_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'EMAIL';
	}

	protected getName(): string {
		return 'email';
	}
}
