import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryDTO';
import {GetCountryList} from '@copor/core/domain/Components/Country/interactor/GetCountryList';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('Get country list tests', () => {
	const mockRepo: jest.Mocked<ListItems<GetCountryDTO>> = {
		list: jest.fn()
	};
	const expectedResponse: GetCountryDTO[] = [{
		id: 'unique-id',
		name: 'country',
		code: 'code',
		publishStatus: PublishStatus.published
	}];
	const getCountryList: GetCountryList = new GetCountryList([], mockRepo);

	it('Should list all countries', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getCountryList.execute()).toEqual(expectedResponse);
	});
});
