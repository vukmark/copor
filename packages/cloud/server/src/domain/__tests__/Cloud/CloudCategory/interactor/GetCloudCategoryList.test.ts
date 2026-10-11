import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {GetCloudCategoryDTO} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/GetCloudCategoryDTO';
import {CategoryType} from '@copor/core/domain/Core/enum/categoryType';
import {GetCloudCategoryList} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/GetCloudCategoryList';

describe('Get list of cloud categories', () => {
	const mockRepo: jest.Mocked<ListItems<GetCloudCategoryDTO>> = {
		list: jest.fn()
	};
	const expectedResponse: GetCloudCategoryDTO[] = [{
		id: 'unique-id',
		name: 'some name',
		description: 'description',
		publishStatus: PublishStatus.published,
		categoryType: CategoryType.groups
	}];
	const getCloudCategoryList: GetCloudCategoryList = new GetCloudCategoryList([], mockRepo);

	it('Should list all cloud categories', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getCloudCategoryList.execute()).toEqual(expectedResponse);
	});
});