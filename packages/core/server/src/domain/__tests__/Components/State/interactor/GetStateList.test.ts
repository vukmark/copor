import {GetStateListRepo} from '@copor/core/domain/Components/State/repository/GetStateListRepo';
import {GetStateList} from '@copor/core/domain/Components/State/interactor/GetStateList';
import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('Get list of states for a specific country', () => {
	const mockRepo: jest.Mocked<GetStateListRepo> = {
		list: jest.fn()
	};
	const expectedResponse: GetStateDTO[] = [{
		id: 'unique-id',
		name: 'Bavaria',
		code: 'BY',
		countryId: 'countryID',
		publishStatus: PublishStatus.published
	}];

	const getStateList: GetStateList = new GetStateList('some-country-id', mockRepo);

	it('Should return list of states for a specific country', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getStateList.execute()).toEqual(expectedResponse);
	});
});

