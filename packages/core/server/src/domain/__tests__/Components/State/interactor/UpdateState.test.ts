import {SaveStateRepo} from '@copor/core/domain/Components/State/repository/SaveStateRepo';
import {SaveStateDTO} from '@copor/core/domain/Components/State/interactor/dto/SaveStateDTO';
import {UpdateState} from '@copor/core/domain/Components/State/interactor/UpdateState';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('Update state tests', () => {
	let mockRepo: jest.Mocked<SaveStateRepo>;
	let inputDTO: SaveStateDTO;
	let updateState: UpdateState;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		inputDTO = {
			id: 'someId',
			name: 'Bayern',
			code: 'BY',
			countryId: 'someCountryId',
			actorId: 'actorId',
			publishStatus: PublishStatus.published
		};
		updateState = new UpdateState(inputDTO, mockRepo);
	});

	it('Should save data for update', async () => {
		await updateState.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(inputDTO);
	});
});