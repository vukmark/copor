import {FormField, RequiredField} from '@copor/core/client/Core/Form/FormField';
import {Color} from '@copor/core/domain/Core/enum/Color';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';

export interface ColorFieldValue {
	color: Color;
	colorSet: ColorSet
}

export class ColorField extends FormField implements RequiredField {
	private readonly currentValue: ColorFieldValue;
	private values: NameAndIdDTO<Color>[];

	constructor(currentValue: ColorFieldValue, values: NameAndIdDTO<Color>[]) {
		super();
		this.currentValue = currentValue;
		this.values = values;
	}

	getRequiredMessage(): string {
		return 'COLOR_IS_REQUIRED';
	}

	getValues(): NameAndIdDTO<Color>[] {
		return this.values;
	}

	protected getFieldType(): FormFieldType {
		return FormFieldType.COLOR;
	}

	protected getLabel(): string {
		return 'COLOR';
	}

	protected getName(): string {
		return 'color';
	}

	protected getCurrentValue(): FieldValueDTO<unknown> {
		return {color: this.currentValue};
	}
}