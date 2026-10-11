import {DeleteNewsRepo} from '@copor/news/domain/News/repository/DeleteNewsRepo';
import {DeleteNews} from '@copor/news/domain/News/interactor/DeleteNews';


describe('Delete News tests', () => {
	const mockRepo: jest.Mocked<DeleteNewsRepo> = {
		delete: jest.fn()
	};
	const deleteNews = new DeleteNews('News-id', mockRepo);

	it('Should delete news', async () => {
		await deleteNews.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('News-id');
	});
});