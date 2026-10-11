import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetImage} from '@copor/core/domain/Components/Image/interactor/GetImage';
import {GetImageDTO} from '@copor/core/domain/Components/Image/interactor/dto/GetImageDTO';

describe('get image interactor tests', () => {
	const mockRepo: jest.Mocked<GetItem<GetImageDTO>> = {
		load: jest.fn()
	};
	const expectedResponse: GetImageDTO = {
		id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
		name: 'sample-image',
		extension: 'jpeg',
		fileSize: 307200,
		width: 1024,
		height: 768,
		path: '/uploads/sample-image.jpeg'
	};
	const interactor: GetImage = new GetImage('id', mockRepo);

	it('Should return image based on provided id', async () => {
		mockRepo.load.mockResolvedValue(expectedResponse);

		expect(await interactor.execute()).toEqual(expectedResponse);
	});
});