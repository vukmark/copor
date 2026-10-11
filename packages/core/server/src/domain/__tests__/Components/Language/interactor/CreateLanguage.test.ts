import {CreateLanguage} from '@copor/core/domain/Components/Language/interactor/CreateLanguage';
import {SaveLanguageRepo} from '@copor/core/domain/Components/Language/repository/SaveLanguageRepo';
import {SaveLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/SaveLanguageDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('create language tests', () => {
	let createLanguage: CreateLanguage;
	let mockRepo: jest.Mocked<SaveLanguageRepo>;
	let input: SaveLanguageDTO;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		input = {
			id: 'uniqueId',
			name: 'Country',
			code: 'code',
			nativeName: 'nativeName',
			actorId: 'some-id',
			publishStatus: PublishStatus.unpublished
		};
		createLanguage = new CreateLanguage(input, mockRepo);
	});

	it('should save language', async() => {
		const result = await createLanguage.execute();

		expect(result).toEqual('uniqueId');
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});
