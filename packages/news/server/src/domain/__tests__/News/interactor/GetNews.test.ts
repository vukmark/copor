import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetNewsDTO} from '@copor/news/domain/News/interactor/dto/GetNewsDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {GetNews} from '@copor/news/domain/News/interactor/GetNews';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

describe('Get news tests', () => {
	const mockRepo: jest.Mocked<GetItem<GetNewsDTO>> = {
		load: jest.fn()
	};
	const expectedResponse: GetNewsDTO = {
		publishDate: new Date(),
		id: 'id',
		title: 'title',
		summary: 'summary',
		content: 'content',
		role: [{
			id: 'roleId',
			type: RoleType.USER,
			name: 'name'
		}],
		publishStatus: PublishStatus.published
	};
	const getNews: GetNews = new GetNews('id', mockRepo);

	it('Should return News based on provided id', async () => {
		mockRepo.load.mockResolvedValue(expectedResponse);

		expect(await getNews.execute()).toEqual(expectedResponse);
	});
});