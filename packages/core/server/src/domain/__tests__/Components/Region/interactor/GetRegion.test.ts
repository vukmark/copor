import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/GetRegionDTO';
import {GetRegion} from '@copor/core/domain/Components/Region/interactor/GetRegion';

describe('Test get region', () => {
	const mockRepo: jest.Mocked<GetItem<GetRegionDTO>> = {
		load: jest.fn()
	};

	const expectedResponse: GetRegionDTO = {
		id: 'someId',
		country: {id: 'countruId', name: 'countryId'},
		state: {id: 'stateId', name: 'stateId'},
		postalCode: '34521',
		cityList: ['Matijevici']
	};

	const getRegion = new GetRegion('uniqueId', mockRepo);

	it('Should return region based on provided id', async () => {
		mockRepo.load.mockResolvedValue(expectedResponse);

		expect(await getRegion.execute()).toEqual(expectedResponse);
	});
});
