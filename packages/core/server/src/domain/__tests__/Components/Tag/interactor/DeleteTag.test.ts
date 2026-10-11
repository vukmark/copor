import {DeleteTagRepo} from '@copor/core/domain/Components/Tag/repository/DeleteTagRepo';
import {DeleteTag} from '@copor/core/domain/Components/Tag/interactor/DeleteTag';

describe('delete tag tests', () => {
	let deleteTag: DeleteTag;
	let mockRepo: jest.Mocked<DeleteTagRepo>;

	beforeEach(() => {
		mockRepo = {
			delete: jest.fn()
		};
		deleteTag = new DeleteTag('unique-id', mockRepo);
	});

	it('should delete todo', async () => {
		await deleteTag.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('unique-id');
	});
});
