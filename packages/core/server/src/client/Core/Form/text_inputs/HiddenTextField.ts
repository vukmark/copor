import {FormField} from '@copor/core/client/Core/Form/FormField';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';

export abstract class HiddenTextField extends FormField {
	protected currentValue: string;
	protected label: string;
	protected name: string;

	constructor(currentValue: string | undefined, label: string | undefined, name: string | undefined) {
		super();
		this.currentValue = currentValue ?? '';
		this.label = label ?? '';
		this.name = name ?? '';
	}

	protected getFieldType(): FormFieldType {
		return FormFieldType.HIDDEN;
	}

	protected getLabel(): string {
		return this.label;
	}

	protected getName(): string {
		return this.name;
	}

	protected getCurrentValue(): FieldValueDTO {
		return {text: this.currentValue};
	}
}
