import {FormField, RequiredField, UsePredefinedValues} from '@copor/core/client/Core/Form/FormField';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';

export class CountryField extends FormField<string> implements UsePredefinedValues<string>, RequiredField {
	protected currentValue: NameAndIdDTO<string>;
	protected values: NameAndIdDTO<string>[];
	protected isEnabled?: boolean;

	constructor(currentValue: NameAndIdDTO<string>, values: NameAndIdDTO<string>[], isEnabled?: boolean) {
		super();
		this.currentValue = currentValue;
		this.values = values;
		this.isEnabled = isEnabled ?? true;
	}

	getValues(): NameAndIdDTO<string>[] {
		return this.values;
	}

	getRequiredMessage(): string {
		return 'COUNTRY_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'COUNTRY';
	}

	protected getName(): string {
		return 'country';
	}

	protected getCurrentValue(): FieldValueDTO<string> {
		return {dropdown: [this.currentValue]};
	}

	protected getFieldType(): FormFieldType {
		if (!this.isEnabled) {
			return FormFieldType.DISABLED_DROPDOWN;
		}

		return FormFieldType.COUNTRY;
	}
}


export class OptionalCountryField extends FormField<string> implements UsePredefinedValues<string> {
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
		return 'COUNTRY';
	}

	protected getName(): string {
		return 'country';
	}

	protected getCurrentValue(): FieldValueDTO<string> {
		return {dropdown: [this.currentValue]};
	}

	protected getFieldType(): FormFieldType {
		return FormFieldType.COUNTRY;
	}
}