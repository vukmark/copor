import {FormField} from '@copor/core/client/Core/Form/FormField';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';

export abstract class DoubleField extends FormField {
	protected currentNumber: number;

	constructor(currentNumber: number) {
		super();
		this.currentNumber = currentNumber;
	}

	protected getFieldType(): FormFieldType {
		return FormFieldType.DOUBLE;
	}

	protected getCurrentValue(): FieldValueDTO<unknown> {
		return {doubleNumber: Number(this.currentNumber)};
	}
}