import {TextBoxField} from '@copor/core/client/Core/Form/text_inputs/TextBoxField';
import {RequiredField} from '@copor/core/client/Core/Form/FormField';

export class DescriptionField extends TextBoxField {
	protected getLabel(): string {
		return 'DESCRIPTION';
	}

	protected getName(): string {
		return 'description';
	}
}

export class RequiredDescriptionField extends TextBoxField implements RequiredField {
	getRequiredMessage(): string {
		return 'DESCRIPTION_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'DESCRIPTION';
	}

	protected getName(): string {
		return 'description';
	}
}