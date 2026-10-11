import {FormField, UsePredefinedValues} from '@copor/core/client/Core/Form/FormField';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';

export abstract class DropDownField<IdType> extends FormField implements UsePredefinedValues<IdType> {
	protected currentValue: NameAndIdDTO<IdType>;
	protected values: NameAndIdDTO<IdType>[];

	constructor(currentValue: NameAndIdDTO<IdType>, values: NameAndIdDTO<IdType>[]) {
		super();
		this.currentValue = currentValue;
		this.values = values;
	}

	getValues(): NameAndIdDTO<IdType>[] {
		return this.values;
	}

	protected getCurrentValue(): FieldValueDTO<IdType> {
		return {dropdown: [this.currentValue]};
	}

	protected getFieldType(): FormFieldType {
		return FormFieldType.DROPDOWN;
	}
}