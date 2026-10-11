import {FormField} from '@copor/core/client/Core/Form/FormField';
import {FormFieldType} from './FormFieldType';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';

export abstract class SearchableDropdownField extends FormField {
	protected currentValue: NameAndIdDTO | undefined;
	constructor(currentValue?: NameAndIdDTO) {
		super();
		this.currentValue = currentValue;
	}
	protected getFieldType(): FormFieldType {
		return FormFieldType.SEARCHABLE_DROPDOWN;
	}
	protected getCurrentValue(): FieldValueDTO<unknown> {
		return {
			dropdown: this.currentValue ? [this.currentValue] : [],
			searchableDropdown: {
				key: this.getKey(),
				filters: this.getFilters()
			}
		};
	}

	protected getFilters(): GetFilterDTO[] | undefined {
		return undefined;
	}

	protected abstract getKey(): string;
}

export abstract class SearchableMultiselect extends FormField {
	private currentValue: NameAndIdDTO[] | undefined;
	constructor(currentValue?: NameAndIdDTO[]) {
		super();
		this.currentValue = currentValue;
	}
	protected getFieldType(): FormFieldType {
		return FormFieldType.SEARCHABLE_MULTISELECT;
	}

	protected getCurrentValue(): FieldValueDTO<unknown> {
		return {
			dropdown: this.currentValue ? this.currentValue : [],
			searchableMultiselect: {
				key: this.getKey(),
				filters: this.getFilters()
			}
		};
	}

	protected getFilters(): GetFilterDTO[] | undefined {
		return undefined;
	}

	protected abstract getKey(): string;
}

export abstract class RangeSearchableMultiselect extends FormField {
	private currentValue: NameAndIdDTO[] | undefined;
	constructor(currentValue?: NameAndIdDTO[]) {
		super();
		this.currentValue = currentValue;
	}
	protected getFieldType(): FormFieldType {
		return FormFieldType.RANGE_SEARCHABLE_MULTISELECT;
	}

	protected getCurrentValue(): FieldValueDTO<unknown> {
		return {
			dropdown: this.currentValue ? this.currentValue : [],
			rangeSearchableMultiselect: {
				key: this.getKey(),
				filters: this.getFilters()
			}
		};
	}

	protected getFilters(): GetFilterDTO[] | undefined {
		return undefined;
	}

	protected abstract getKey(): string;
}
