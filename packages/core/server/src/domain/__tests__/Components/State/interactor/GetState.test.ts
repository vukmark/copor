import {GetStateRepo} from '@copor/core/domain/Components/State/repository/GetStateRepo';
import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {GetState} from '@copor/core/domain/Components/State/interactor/GetState';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('get state tests', () => {
	const mockRepo: jest.Mocked<GetStateRepo> = {
		load: jest.fn()
	};
	const mockedReturnState: GetStateDTO = {
		id: 'unique-id',
		name: 'state',
		code: 'code',
		countryId: 'countryId',
		publishStatus: PublishStatus.published
	};
	const getState = new GetState('unique-id', mockRepo);

	it('should return state', async () => {
		mockRepo.load.mockResolvedValue(mockedReturnState);

		expect(await getState.execute()).toEqual(mockedReturnState);
		expect(mockRepo.load).toHaveBeenCalledWith('unique-id');
	});
});