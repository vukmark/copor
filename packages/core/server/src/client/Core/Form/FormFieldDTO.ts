import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {ColorFieldValue} from '@copor/core/client/Core/Form/color_inputs/ColorField';
import {PhoneNumberType} from '@copor/core/domain/Core/global/PhoneNumber/PhoneNumberType';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';

export interface FormFieldDTO<T = unknown> {
	label: string;
	name: string;
	type: FormFieldType;
	requiredMessage?: string;
	optionalMessage?: string;
	infoMessage?: string;
	values?: NameAndIdDTO<T>[];
	currentValue?: FieldValueDTO;
}

export interface PhoneNumberListDTO {
	id?: string;
	phoneNumber: string;
	phoneNumberType: PhoneNumberType;
}

interface SearchableDropdownDTO {
	key: string;
	filters?: GetFilterDTO[];
}

interface ContractValueDTO {
	contractType: string;
	accepted: boolean;
	contractRoute: string;
	iconMessage: string;
}

export interface FieldValueDTO<T = unknown> {
	text?: string;
	date?: string;
	picture?: string;
	dropdown?: NameAndIdDTO<T>[];
	searchableDropdown?: SearchableDropdownDTO;
	searchableMultiselect?: SearchableDropdownDTO;
	rangeSearchableMultiselect?: SearchableDropdownDTO;
	boolDropdown?: NameAndIdDTO<boolean>;
	checkbox?: boolean;
	color?: ColorFieldValue;
	number?: number
	doubleNumber?: number
	phoneNumberList?: PhoneNumberListDTO[]
	contract?: ContractValueDTO;
	triggerLength?: number;
	triggerLengths?: number[];
	maxLength?: number;
	validationEndpoint?: string;
	uploadEndpoint?: string;
	isSuccess?: boolean;
	checkStatusMessage?: string;
	textList?: string[];
}
