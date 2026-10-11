import {InfoField} from '@copor/core/client/Core/Info/InfoField';
import {InfoFieldType} from '@copor/core/client/Core/Info/InfoFieldType';
import {InfoFieldValueDTO} from '@copor/core/client/Core/Info/InfoFieldDTO';

export abstract class CopyableInfoTextField extends InfoField {
	protected value: string;

	constructor(value: string) {
		super();
		this.value = value;
	}

	protected getFieldType(): InfoFieldType {
		return InfoFieldType.COPYABLE_TEXT;
	}

	protected getValue(): InfoFieldValueDTO {
		return {text: this.value};
	}
}