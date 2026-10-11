import {DeleteLanguage} from '@copor/core/domain/Components/Language/interactor/DeleteLanguage';
import {DeleteLanguageRepo} from '@copor/core/domain/Components/Language/repository/DeleteLanguageRepo';

describe('delete language tests', () => {
	let deleteLanguage: DeleteLanguage;
	let mockRepo: jest.Mocked<DeleteLanguageRepo>;

	beforeEach(() => {
		mockRepo = {
			delete: jest.fn()
		};
		deleteLanguage = new DeleteLanguage('unique-id', mockRepo);
	});
	it('should language level', async () => {
		await deleteLanguage.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('unique-id');
	});
});
