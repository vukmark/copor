import {GetRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/GetRegionDTO';
import {GetRegionList} from '@copor/core/domain/Components/Region/interactor/GetRegionList';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';

describe('Get Region list test', () => {
	const mockRepo: jest.Mocked<ListItems<GetRegionDTO>> = {
		list: jest.fn()
	};
	const expectedResponse: GetRegionDTO[] = [{
		id: 'unique-id',
		country: {id: 'countruId', name: 'countryId'},
		state: {id: 'stateId', name: 'stateId'},
		postalCode: '34521',
		cityList: ['Riessa']
	}];
	const getRegionList: GetRegionList = new GetRegionList([], mockRepo);

	it('Should list all regions', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getRegionList.execute()).toEqual(expectedResponse);
	});
});
