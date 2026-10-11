import {CreateNews} from '@copor/news/domain/News/interactor/CreateNews';
import {SaveNewsRepo} from '@copor/news/domain/News/repository/SaveNewsRepo';
import {SaveNewsDTO} from '@copor/news/domain/News/interactor/dto/SaveNewsDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('Create News', () => {
	let createNews: CreateNews;
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
			roleId: ['roleID'],
			publishStatus: PublishStatus.published,
			actorId: 'uid'
		};
		createNews = new CreateNews(inputDTO, mockRepo);
	});

	it('Should Create News', async () => {
		const result = await createNews.execute();

		expect(result).toEqual('id');
		expect(mockRepo.save).toHaveBeenCalledWith(inputDTO);
	});
});