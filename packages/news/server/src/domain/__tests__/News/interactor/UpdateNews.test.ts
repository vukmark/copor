import {UpdateNews} from '@copor/news/domain/News/interactor/UpdateNews';
import {SaveNewsRepo} from '@copor/news/domain/News/repository/SaveNewsRepo';
import {SaveNewsDTO} from '@copor/news/domain/News/interactor/dto/SaveNewsDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('Update News', () => {
	let updateNews: UpdateNews;
	let mockRepo: jest.Mocked<SaveNewsRepo>;
	let inputDTO: SaveNewsDTO;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		inputDTO = {
			id: 'id',
			title: 'title',
			summary: 'summary',
			content: 'content',
			roleId:['ac896493-4998-42ed-ac79-50fe8e535564'],
			publishStatus: PublishStatus.published,
			actorId: 'uid'
		};
		updateNews = new UpdateNews(inputDTO, mockRepo);
	});

	it('Should save data for update', async () => {
		await updateNews.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(inputDTO);
	});
});