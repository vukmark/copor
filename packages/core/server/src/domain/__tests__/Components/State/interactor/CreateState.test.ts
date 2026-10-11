import {CreateState} from '@copor/core/domain/Components/State/interactor/CreateState';
import {SaveStateRepo} from '@copor/core/domain/Components/State/repository/SaveStateRepo';
import {SaveStateDTO} from '@copor/core/domain/Components/State/interactor/dto/SaveStateDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('Test create new state', () => {
	let createState: CreateState;
	let mockRepo: jest.Mocked<SaveStateRepo>;
	let inputDTO: SaveStateDTO;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		inputDTO = {
			id: 'unique-id',
			name: 'someState',
			code: 'someCode',
			countryId: 'someCountryId',
			actorId: 'someActorId',
			publishStatus: PublishStatus.unpublished
		};
		createState = new CreateState(inputDTO, mockRepo);
	});

	it('Should save state', async () => {
		const result = await createState.execute();

		expect(result).toEqual('unique-id');
		expect(mockRepo.save).toHaveBeenCalledWith(inputDTO);
	});
});