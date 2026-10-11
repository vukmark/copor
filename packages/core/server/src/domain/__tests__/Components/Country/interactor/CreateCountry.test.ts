import {CreateCountry} from '@copor/core/domain/Components/Country/interactor/CreateCountry';
import {SaveCountryRepo} from '@copor/core/domain/Components/Country/repository/SaveCountryRepo';
import {SaveCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/SaveCountryDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('create country tests', () => {
	let createCountry: CreateCountry;
	let mockRepo: jest.Mocked<SaveCountryRepo>;
	let inputDTO: SaveCountryDTO;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		inputDTO = {
			id: 'unique-id',
			name: 'name',
			code: 'NM',
			actorId: 'some-id',
			publishStatus: PublishStatus.published
		};
		createCountry = new CreateCountry(inputDTO, mockRepo);
	});

	it('should save country', async() => {
		const result = await createCountry.execute();

		expect(result).toEqual('unique-id');
		expect(mockRepo.save).toHaveBeenCalledWith(inputDTO);
	});
});
