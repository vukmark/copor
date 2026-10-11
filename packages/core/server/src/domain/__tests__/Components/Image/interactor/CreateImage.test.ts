import {CreateImage} from '@copor/core/domain/Components/Image/interactor/CreateImage';
import {CreateImageRepo} from '@copor/core/domain/Components/Image/repository/CreateImageRepo';
import {SaveImageDTO} from '@copor/core/domain/Components/Image/interactor/dto/SaveImageDTO';

describe('Create image interactor tests', () => {
	const mockRepo: jest.Mocked<CreateImageRepo> = {
		save: jest.fn()
	};
	const input: SaveImageDTO = {
		id: '123e4567-e89b-12d3-a456-426614174000',
		image: Buffer.from('test image content', 'utf-8'),
		name: 'name',
		actorId: 'aid'
	};

	it('should save item', async () => {
		const interactor: CreateImage = new CreateImage(input, mockRepo);

		await interactor.execute();

		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});