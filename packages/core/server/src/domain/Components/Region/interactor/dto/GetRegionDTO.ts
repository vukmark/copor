import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';

export interface GetRegionDTO {
	id: string;
	country: NameAndIdDTO;
	state: NameAndIdDTO;
	postalCode: string;
	cityList: string[];
}
