import {SetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/SetFilterDTO';
import {GetFilterList} from '@copor/core/domain/Core/global/Filter/interactor/GetFilterList';
import {GetFilterListRepo} from '@copor/core/domain/Core/global/Filter/repository/GetFilterListRepo';
import {FilterType} from '@copor/core/domain/Core/enum/FilterType';
import {GetFilterListDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterListDTO';
import {FilterablePages} from '@copor/core/domain/Core/enum/FilterablePages';

describe('get filter list interactor tests', () => {
	const mockRepo: jest.Mocked<GetFilterListRepo> = {
		getFilterList: jest.fn()
	};
	const expectedResponse: SetFilterDTO[] = [{
		name: {value: 'example', translation: 'Example'},
		type: FilterType.IN,
		values: [
			{value: 'value', translation: 'Value'}
		]
	}];
	const inputDTO: GetFilterListDTO = {
		actorId: 'actorId',
		page: FilterablePages.ROLE
	};
	const getFilterList: GetFilterList = new GetFilterList(inputDTO, mockRepo);

	it('should return expected response', async () => {
		mockRepo.getFilterList.mockResolvedValue(expectedResponse);
		expect(await getFilterList.execute()).toEqual(expectedResponse);
	});
});
