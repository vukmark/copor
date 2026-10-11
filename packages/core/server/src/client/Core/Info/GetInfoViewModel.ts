import {InfoFieldDTO} from '@copor/core/client/Core/Info/InfoFieldDTO';

export interface GetInfoViewModel {
	title: string;
	fields: InfoFieldDTO[];
	logDataTitle: string;
	logDataFields: InfoFieldDTO[];
}