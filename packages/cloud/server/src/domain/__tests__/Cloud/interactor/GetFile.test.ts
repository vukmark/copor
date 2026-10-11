import {GetFileDTO} from '@copor/cloud/domain/Cloud/interactor/dto/GetFileDTO';
import {GetFile} from '@copor/cloud/domain/Cloud/interactor/GetFile';
import {GetFileRepo} from '@copor/cloud/domain/Cloud/repository/GetFileRepo';

describe('Get File tests', () => {
	const mockRepo: jest.Mocked<GetFileRepo> = {
		load: jest.fn()
	};

	const expectedResponse: GetFileDTO = {
		file: Buffer.from('test'),
		fileName: 'filename'
	};
	const getFile: GetFile = new GetFile('unique-id', mockRepo);

	it('Should return File based on provided id', async () => {
		mockRepo.load.mockResolvedValue(expectedResponse);

		expect(await getFile.execute()).toEqual(expectedResponse);
	});
});