import {SetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/SetFilterDTO';
import {GetFilterListRepo} from '@copor/core/domain/Core/global/Filter/repository/GetFilterListRepo';
import {FilterType} from '@copor/core/domain/Core/enum/FilterType';

export class FakeGetFilterListInteractorRepo implements GetFilterListRepo {
	getFilterList(actorId: string, page: string): Promise<SetFilterDTO[]> {
		return Promise.resolve([{
			name: {
				value: 'DUE_DATE',
				translation: 'Due date'
			},
			type: FilterType.SORT,
			values: [
				{
					value: 'TODAY',
					translation: 'Today'
				},
				{
					value: 'TOMORROW',
					translation: 'Tomorrow'
				}
			]
		}]);
	}
}