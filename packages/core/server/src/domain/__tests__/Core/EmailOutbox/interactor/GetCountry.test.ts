import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetCountry} from '@copor/core/domain/Components/Country/interactor/GetCountry';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {GetCountryWithStateListDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryWithStateListDTO';

describe('get country interactor tests', () => {
	const mockRepo: jest.Mocked<GetItem<GetCountryWithStateListDTO>> = {
		load: jest.fn()
	};

	const expectedResponse: GetCountryWithStateListDTO = {
		id: 'unique-id',
		name: 'country',
		code: 'code',
		publishStatus: PublishStatus.published,
		stateList: [{
			id: 'id',
			publishStatus: PublishStatus.published,
			name: 'stateName',
			countryId: 'cId',
			code: 'ST'
		}]
	};

	const getCountry: GetCountry = new GetCountry('unique-id', mockRepo);

	it('should return country based on provided id', async () => {
		mockRepo.load.mockResolvedValue(expectedResponse);

		expect(await getCountry.execute()).toEqual(expectedResponse);
	});
});

