import {FormField} from '@copor/core/client/Core/Form/FormField';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';

export abstract class TextListField extends FormField<string[]> {
	protected currentValue: string[];

	constructor(currentValue: string[] | undefined) {
		super();
		this.currentValue = currentValue ?? [];
	}

	protected getFieldType(): FormFieldType {
		return FormFieldType.TEXT_LIST;
	}

	protected getCurrentValue(): FieldValueDTO<string[]> {
		return {textList: this.currentValue};
	}
}
