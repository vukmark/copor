import CreateCloudCategory from '@copor/cloud/domain/Cloud/CloudCategory/interactor/CreateCloudCategory';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {CategoryType} from '@copor/core/domain/Core/enum/categoryType';
import {SaveCloudCategoryRepo} from '@copor/cloud/domain/Cloud/CloudCategory/repository/SaveCloudCategoryRepo';
import {SaveCloudCategoryDTO} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/SaveCloudCategoryDTO';

describe('Test Cloud Category Create Interactor', () => {
	let createCloudCategory: CreateCloudCategory;
	let mockRepo: jest.Mocked<SaveCloudCategoryRepo>;
	let input: SaveCloudCategoryDTO;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		input = {
			id: 'uniqueId',
			name: 'name',
			description: 'description',
			publishStatus: PublishStatus.published,
			categoryType: CategoryType.facility,
			actorId: 'actorId'
		};
		createCloudCategory = new CreateCloudCategory(input, mockRepo);
	});
	it('Should save cloud category', async () => {
		const result = await createCloudCategory.execute();

		expect(result).toEqual('uniqueId');
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});