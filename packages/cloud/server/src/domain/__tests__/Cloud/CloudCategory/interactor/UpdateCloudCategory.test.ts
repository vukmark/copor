import {UpdateCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/UpdateCloudCategory';
import {SaveCloudCategoryDTO} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/SaveCloudCategoryDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {CategoryType} from '@copor/core/domain/Core/enum/categoryType';
import {SaveCloudCategoryRepo} from '@copor/cloud/domain/Cloud/CloudCategory/repository/SaveCloudCategoryRepo';

describe('Test Cloud Category Update Interactor', () => {
	let updateCloudCategory: UpdateCloudCategory;
	let mockRepo: jest.Mocked<SaveCloudCategoryRepo>;
	let input : SaveCloudCategoryDTO;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		input = {
			id: 'some-id',
			name: 'name',
			description: 'desc',
			publishStatus: PublishStatus.published,
			categoryType: CategoryType.facility,
			actorId: 'crId'
		};

		updateCloudCategory = new UpdateCloudCategory(input, mockRepo);
	});
	it('Should save data for update', async () => {
		await updateCloudCategory.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});
