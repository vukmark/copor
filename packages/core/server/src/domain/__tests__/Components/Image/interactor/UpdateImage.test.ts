import {SaveImageDTO} from '@copor/core/domain/Components/Image/interactor/dto/SaveImageDTO';
import {UpdateImage} from '@copor/core/domain/Components/Image/interactor/UpdateImage';
import {SaveImageRepo} from '@copor/core/domain/Components/Image/repository/SaveImageRepo';

describe('Update image interactor tests', () => {
	let mockRepo: jest.Mocked<SaveImageRepo>;
	let input: SaveImageDTO;
	let updateImage: UpdateImage;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		input = {
			id: '12345',
			name: 'imgName',
			image: Buffer.from('test'),
			actorId: 'actid'
		};
		updateImage = new UpdateImage(input, mockRepo);
	});

	it('Should save data for update', async () => {
		await updateImage.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});