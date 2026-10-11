import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetNewsDTO} from '@copor/news/domain/News/interactor/dto/GetNewsDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {GetNewsList} from '@copor/news/domain/News/interactor/GetNewsList';

describe('Get list of news', () => {
	const mockRepo: jest.Mocked<ListItems<GetNewsDTO>> = {
		list: jest.fn()
	};

	const expectedResponse: GetNewsDTO[] = [
		{
			id: 'id',
			title: 'title',
			summary: 'summary',
			content: 'content',
			role: [{
				id: 'roleId',
				type: RoleType.USER,
				name: 'name'
			}],
			publishDate: new Date(),
			publishStatus: PublishStatus.published
		},
		{
			id: 'id1',
			title: 'title1',
			summary: 'summary1',
			content: 'content1',
			role: [{
				id: 'roleId',
				type: RoleType.USER,
				name: 'name'
			}],
			publishDate: new Date(),
			publishStatus: PublishStatus.published
		}
	];
	const getNewsList: GetNewsList = new GetNewsList([], mockRepo);

	it('Should list all News', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getNewsList.execute()).toEqual(expectedResponse);
	});
});