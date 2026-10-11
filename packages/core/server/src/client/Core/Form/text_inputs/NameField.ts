import {TextField} from '@copor/core/client/Core/Form/text_inputs/TextField';
import {RequiredField} from '@copor/core/client/Core/Form/FormField';

export class NameField extends TextField implements RequiredField {
	getRequiredMessage(): string {
		return 'NAME_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'NAME';
	}

	protected getName(): string {
		return 'name';
	}
}