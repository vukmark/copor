import {FormField} from '@copor/core/client/Core/Form/FormField';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';

export abstract class PasswordField extends FormField {
	protected currentValue: string;

	constructor(currentValue: string | undefined) {
		super();
		this.currentValue = currentValue ?? '';
	}

	protected getFieldType(): FormFieldType {
		return FormFieldType.PASSWORD;
	}

	protected getCurrentValue(): FieldValueDTO {
		return {text: this.currentValue};
	}
}