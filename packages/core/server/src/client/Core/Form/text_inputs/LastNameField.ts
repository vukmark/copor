import {TextField} from '@copor/core/client/Core/Form/text_inputs/TextField';
import {RequiredField} from '@copor/core/client/Core/Form/FormField';

export class LastNameField extends TextField implements RequiredField {
	getRequiredMessage(): string {
		return 'LAST_NAME_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'LAST_NAME';
	}

	protected getName(): string {
		return 'lastName';
	}
}