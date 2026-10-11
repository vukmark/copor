import {FormFieldDTO} from '@copor/core/client/Core/Form/FormFieldDTO';

export interface GetFormViewModel {
	fields: FormFieldDTO[];
	endpoint: string;
}