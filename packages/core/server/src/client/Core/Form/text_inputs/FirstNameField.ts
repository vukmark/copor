import {TextField} from '@copor/core/client/Core/Form/text_inputs/TextField';
import {RequiredField} from '@copor/core/client/Core/Form/FormField';

export class FirstNameField extends TextField implements RequiredField {
	getRequiredMessage(): string {
		return 'FIRST_NAME_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'FIRST_NAME';
	}

	protected getName(): string {
		return 'firstName';
	}
}