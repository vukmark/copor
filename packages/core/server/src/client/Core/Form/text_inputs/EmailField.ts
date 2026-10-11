import {FormField} from '@copor/core/client/Core/Form/FormField';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';

export abstract class EmailField extends FormField {
	protected isEnabled?: boolean;
	private readonly currentEmail: string;

	constructor(currentEmail: string | undefined, isEnabled?: boolean | undefined) {
		super();
		this.currentEmail = currentEmail ?? '';
		this.isEnabled = isEnabled ?? true;
	}

	protected getFieldType(): FormFieldType {
		if (!this.isEnabled) {
			return FormFieldType.DISABLED_TEXT;
		}

		return FormFieldType.EMAIL;
	}

	protected getCurrentValue(): FieldValueDTO<unknown> {
		return {text: this.currentEmail};
	}
}