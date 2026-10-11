import {SaveCountryRepo} from '@copor/core/domain/Components/Country/repository/SaveCountryRepo';
import {SaveCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/SaveCountryDTO';
import {UpdateCountry} from '@copor/core/domain/Components/Country/interactor/UpdateCountry';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('update country tests', () => {
	let mockRepo: jest.Mocked<SaveCountryRepo>;
	let inputDTO: SaveCountryDTO;
	let updateCountry: UpdateCountry;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		inputDTO = {
			id: 'some-id',
			name: 'name',
			code: 'CD',
			actorId: 'creator-id',
			publishStatus: PublishStatus.unpublished
		};
		updateCountry = new UpdateCountry(inputDTO, mockRepo);
	});
	it('should save data for update', async () => {
		await updateCountry.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(inputDTO);
	});
});
