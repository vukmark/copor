import {FilterType} from '@copor/core/domain/Core/enum/FilterType';
import {FilterName} from '@copor/core/domain/Core/global/Filter/dto/FilterName';

export interface SetFilterDTO {
	name: FilterName;
	type: FilterType;
	values?: FilterName[];
}
