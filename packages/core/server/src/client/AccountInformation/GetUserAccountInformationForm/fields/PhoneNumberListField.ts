import {FormField, RequiredField} from '@copor/core/client/Core/Form/FormField';
import {FieldValueDTO, PhoneNumberListDTO} from '@copor/core/client/Core/Form/FormFieldDTO';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';

export class PhoneNumberListField extends FormField implements RequiredField {
	protected currentPhoneNumberList: PhoneNumberListDTO[];

	constructor(currentPhoneNumberList: PhoneNumberListDTO[]) {
		super();
		this.currentPhoneNumberList = currentPhoneNumberList;
	}

	getRequiredMessage(): string {
		return 'PHONE_NUMBER_LIST_REQUIRED';
	}

	protected getFieldType(): FormFieldType {
		return FormFieldType.PHONE_NUMBER_LIST;
	}

	protected getCurrentValue(): FieldValueDTO<unknown> {
		return {phoneNumberList: this.currentPhoneNumberList};
	}

	protected getLabel(): string {
		return 'PHONE_NUMBER_LIST';
	}

	protected getName(): string {
		return 'phoneNumberList';
	}
}
