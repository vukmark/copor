import {InfoFieldType} from '@copor/core/client/Core/Info/InfoFieldType';

export interface InfoFieldDTO<T = unknown> {
	label: string;
	value: InfoFieldValueDTO;
	type: InfoFieldType;
}

export interface InfoFieldValueDTO<T = unknown> {
	text?: string;
}