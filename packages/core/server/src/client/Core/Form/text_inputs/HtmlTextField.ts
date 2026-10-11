import {RequiredField} from '@copor/core/client/Core/Form/FormField';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {TextBoxField} from '@copor/core/client/Core/Form/text_inputs/TextBoxField';

export abstract class HtmlTextField extends TextBoxField {
	protected getFieldType(): FormFieldType {
		return FormFieldType.HTML_TEXT;
	}
}

export class HtmlDescriptionField extends HtmlTextField {
	protected getLabel(): string {
		return 'DESCRIPTION';
	}

	protected getName(): string {
		return 'description';
	}
}

export class RequiredHtmlDescriptionField extends HtmlDescriptionField implements RequiredField {
	getRequiredMessage(): string {
		return 'DESCRIPTION_IS_REQUIRED';
	}
}
