import {DeleteCloudCategoryRepo} from '@copor/cloud/domain/Cloud/CloudCategory/repository/DeleteCloudCategoryRepo';
import {DeleteCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/DeleteCloudCategory';

describe('Test Delete Cloud Category Interactor', () => {
	const mockRepo: jest.Mocked<DeleteCloudCategoryRepo> = {
		delete: jest.fn()
	};
	const deleteCloudCategory: DeleteCloudCategory = new DeleteCloudCategory('unique-id', mockRepo);

	it('should delete cloud category', async () => {
		await deleteCloudCategory.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('unique-id');
	});
});
