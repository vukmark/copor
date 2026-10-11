import {FormField} from '@copor/core/client/Core/Form/FormField';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';

export abstract class NumberField extends FormField {
	protected currentNumber: number;

	constructor(currentNumber: number) {
		super();
		this.currentNumber = currentNumber;
	}

	protected getFieldType(): FormFieldType {
		return FormFieldType.NUMBER;
	}

	protected getCurrentValue(): FieldValueDTO<unknown> {
		return {number: this.currentNumber};
	}
}