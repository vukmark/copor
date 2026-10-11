import {SetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/SetFilterDTO';
import {FilterListHelper} from '@copor/core/client/Core/Helpers/FilterListHelper';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {FilterType} from '@copor/core/domain/Core/enum/FilterType';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export class RoleFilterListHelper {
	public static getRoleFilterList(): SetFilterDTO[] {
		return [
			{
				name: FilterListHelper.getFilterName(FilterNameValues.SEARCH),
				type: FilterType.SEARCH
			},
			{
				name: FilterListHelper.getFilterName(FilterNameValues.ROLE),
				type: FilterType.IN,
				values: FilterListHelper.enumToFilterNameArray(RoleType)
			},
			{
				name: FilterListHelper.getFilterName(FilterNameValues.SORT_BY_NAME),
				type: FilterType.SORT
			}
		];
	}
}