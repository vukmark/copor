import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {GetCloudCategoryDTO} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/GetCloudCategoryDTO';
import {CategoryType} from '@copor/core/domain/Core/enum/categoryType';
import {GetCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/GetCloudCategory';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';

describe('get cloud category tests', () => {
	const mockRepo: jest.Mocked<GetItem<GetCloudCategoryDTO>> = {
		load: jest.fn()
	};

	const mockedReturnCloudCategory: GetCloudCategoryDTO = {
		id: 'unique-id',
		name: 'cloud category',
		publishStatus: PublishStatus.published,
		categoryType: CategoryType.groups
	};

	const getCloudCategory: GetCloudCategory = new GetCloudCategory('unique-id', mockRepo);

	it('should return cloud category', async () => {
		mockRepo.load.mockResolvedValue(mockedReturnCloudCategory);

		expect(await getCloudCategory.execute()).toEqual(mockedReturnCloudCategory);
	});
});