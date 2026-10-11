import {FormField, UsePredefinedValues} from '@copor/core/client/Core/Form/FormField';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';

export abstract class YesNoDropDownField extends FormField<boolean> implements UsePredefinedValues<boolean> {
	protected currentValue: boolean;
	protected values: NameAndIdDTO<boolean>[];

	constructor(input: boolean) {
		super();
		this.currentValue = input;
	}

	getValues(): NameAndIdDTO<boolean>[] {
		return [
			{
				id: false,
				name: this.getTranslation('NO')
			},
			{
				id: true,
				name: this.getTranslation('YES')
			}
		];
	}

	protected getFieldType(): FormFieldType {
		return FormFieldType.BOOLEAN;
	}

	protected getCurrentValue(): FieldValueDTO<boolean> {
		const yesOrNo: string = this.currentValue ? 'YES' : 'NO';
		const currentValue = {id: this.currentValue, name: this.getTranslation(yesOrNo)};

		return {dropdown: [currentValue]};
	}
}