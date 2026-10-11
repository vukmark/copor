import {FormField, RequiredField, UsePredefinedValues} from '@copor/core/client/Core/Form/FormField';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';

export class TimeZoneField extends FormField<string> implements UsePredefinedValues<string>, RequiredField {
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

	getRequiredMessage(): string {
		return 'TIME_ZONE_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'TIME_ZONE';
	}

	protected getName(): string {
		return 'timeZone';
	}

	protected getCurrentValue(): FieldValueDTO<string> {
		return {dropdown: [this.currentValue]};
	}

	protected getFieldType(): FormFieldType {
		return FormFieldType.DROPDOWN;
	}
}
