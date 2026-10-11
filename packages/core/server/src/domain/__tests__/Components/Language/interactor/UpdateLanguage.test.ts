import {SaveLanguageRepo} from '@copor/core/domain/Components/Language/repository/SaveLanguageRepo';
import {SaveLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/SaveLanguageDTO';
import {UpdateLanguage} from '@copor/core/domain/Components/Language/interactor/UpdateLanguage';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('Update language tests', () => {
	let mockRepo: jest.Mocked<SaveLanguageRepo>;
	let updateLanguage: UpdateLanguage;
	let inputDTO: SaveLanguageDTO;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		inputDTO = {
			id: 'unique-id',
			name: 'Country',
			code: 'code',
			nativeName: 'nativeName',
			actorId: 'some-id',
			publishStatus: PublishStatus.published
		};
		updateLanguage = new UpdateLanguage(inputDTO, mockRepo);
	});

	it('Update should be called on execute', async () => {
		await updateLanguage.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(inputDTO);
	});
});
