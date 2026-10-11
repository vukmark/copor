import {FormField} from '@copor/core/client/Core/Form/FormField';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';

export abstract class TextBoxField extends FormField {
	protected currentValue: string;

	public constructor(currentValue: string | undefined) {
		super();
		this.currentValue = currentValue ?? '';
	}

	protected getFieldType(): FormFieldType {
		return FormFieldType.TEXTBOX;
	}

	protected getCurrentValue(): FieldValueDTO<unknown> {
		return {text: this.currentValue};
	}
}