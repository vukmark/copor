import {FormField, RequiredField, UsePredefinedValues} from '@copor/core/client/Core/Form/FormField';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';

export class StateField extends FormField<string> implements UsePredefinedValues<string>, RequiredField {
	protected currentValue: NameAndIdDTO<string>;
	protected values: NameAndIdDTO<string>[];

	constructor(currentValue: NameAndIdDTO<string>, values: NameAndIdDTO<string>[]) {
		super();
		this.currentValue = currentValue;
		this.values = values;
	}
	getRequiredMessage(): string {
		return 'STATE_IS_REQUIRED';
	}

	getValues(): NameAndIdDTO<string>[] {
		return this.values;
	}

	protected getLabel(): string {
		return 'STATE';
	}

	protected getName(): string {
		return 'state';
	}

	protected getCurrentValue(): FieldValueDTO<string> {
		return {dropdown: [this.currentValue]};
	}

	protected getFieldType(): FormFieldType {
		return FormFieldType.STATE;
	}
}


export class OptionalStateField extends FormField<string> implements UsePredefinedValues<string> {
	protected currentValue: NameAndIdDTO<string>;
	protected values: NameAndIdDTO<string>[];

	constructor(currentValue: NameAndIdDTO<string>, values: NameAndIdDTO<string>[]) {
		super();
		this.currentValue = currentValue;
		this.values = values;
	}

	getValues(): NameAndIdDTO<string>[] {
		return this.values;
	}

	protected getLabel(): string {
		return 'STATE';
	}

	protected getName(): string {
		return 'state';
	}

	protected getCurrentValue(): FieldValueDTO<string> {
		return {dropdown: [this.currentValue]};
	}

	protected getFieldType(): FormFieldType {
		return FormFieldType.STATE;
	}
}

export class StateValidationField extends FormField<string> implements UsePredefinedValues<string>, RequiredField {
	protected currentValue: NameAndIdDTO<string>;
	protected values: NameAndIdDTO<string>[];
	protected isEnabled?: boolean;

	constructor(currentValue: NameAndIdDTO<string>, values: NameAndIdDTO<string>[], isEnabled?: boolean) {
		super();
		this.currentValue = currentValue;
		this.values = values;
		this.isEnabled = isEnabled ?? true;
	}

	getRequiredMessage(): string {
		return 'STATE_IS_REQUIRED';
	}

	getValues(): NameAndIdDTO<string>[] {
		return this.values;
	}

	protected getLabel(): string {
		return 'STATE_VALIDATION';
	}

	protected getName(): string {
		return 'stateValidation';
	}

	protected getCurrentValue(): FieldValueDTO<string> {
		return {dropdown: [this.currentValue]};
	}

	protected getFieldType(): FormFieldType {
		if (!this.isEnabled) {
			return FormFieldType.DISABLED_DROPDOWN;
		}

		return FormFieldType.STATE_VALIDATION;
	}
}