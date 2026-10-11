import i18next from 'i18next';
import {FieldValueDTO, FormFieldDTO} from '@copor/core/client/Core/Form/FormFieldDTO';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';

export interface UsePredefinedValues<T> {
	getValues(): NameAndIdDTO<T>[];
}

export interface RequiredField {
	getRequiredMessage() : string;
}

export interface OptionalField {
	getOptionalMessage(): string;
}

export interface InfoField {
	getInfoField(): string;
}

const CLEARABLE_FIELD_TYPES: ReadonlySet<FormFieldType> = new Set([
	FormFieldType.DROPDOWN,
	FormFieldType.COUNTRY,
	FormFieldType.STATE,
	FormFieldType.CITIZENSHIP,
	FormFieldType.SEARCHABLE_DROPDOWN,
	FormFieldType.CONTENT_ITEM
]);

export abstract class FormField<T = unknown> {
	protected i18n;

	protected constructor() {
		this.i18n = i18next;
		this.i18n.setDefaultNamespace('form');
	}

	public isClearable(): boolean {
		if (!CLEARABLE_FIELD_TYPES.has(this.getFieldType()))
			return false;

		return !this.isRequiredField();
	}

	getField(): FormFieldDTO {
		const field: FormFieldDTO = {
			currentValue: this.getCurrentValue(),
			label: this.getTranslatedLabel(),
			name: this.getName(),
			requiredMessage: this.getTranslatedRequiredMessage(),
			type: this.getFieldType()
		};

		if (this.hasPredefinedValues()) {
			field.values = this.getValues();
		}

		if (this.isOptionalField()) {
			field.optionalMessage = this.getTranslation((this as OptionalField).getOptionalMessage());
		}

		if (this.isInfoField()) {
			field.infoMessage = this.getTranslation((this as InfoField).getInfoField());
		}

		return field;
	}


	protected getTranslation(translationKey: string, options?: Record<string, string>) : string {
		return this.i18n.t(`translationStringList.${translationKey}`, options);
	}

	private getTranslatedLabel() : string {
		return this.getTranslation(this.getLabel());
	}

	private getTranslatedRequiredMessage() : string | undefined {
		if (this.isRequiredField()) {
			return this.getTranslation(this.getRequiredMessage());
		}

		return undefined;
	}

	private hasPredefinedValues(): this is UsePredefinedValues<T> {
		return 'getValues' in this && typeof (this as UsePredefinedValues<T>).getValues === 'function';
	}

	private isRequiredField(): this is RequiredField {
		return 'getRequiredMessage' in this && typeof (this as RequiredField).getRequiredMessage === 'function';
	}

	private isOptionalField(): this is OptionalField {
		return 'getOptionalMessage' in this && typeof (this as OptionalField).getOptionalMessage === 'function';
	}

	private isInfoField(): this is InfoField {
		return 'getInfoField' in this && typeof (this as InfoField).getInfoField === 'function';
	}

	protected abstract getFieldType() : FormFieldType;
	protected abstract getCurrentValue() : FieldValueDTO<T>;
	protected abstract getLabel() : string;
	protected abstract getName(): string;
}
