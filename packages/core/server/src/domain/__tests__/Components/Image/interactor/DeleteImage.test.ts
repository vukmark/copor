import {DeleteImage} from '@copor/core/domain/Components/Image/interactor/DeleteImage';
import {DeleteImageRepo} from '@copor/core/domain/Components/Image/repository/DeleteImageRepo';

describe('Delete image interactor tests', () => {
	const mockRepo: jest.Mocked<DeleteImageRepo> = {
		delete: jest.fn()
	};
	const interactor = new DeleteImage('djads', mockRepo);

	it('Should delete an image', async () => {
		await interactor.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('djads');
	});
});