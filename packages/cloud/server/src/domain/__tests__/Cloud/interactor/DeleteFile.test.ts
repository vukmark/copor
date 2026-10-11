import {DeleteFileRepo} from '@copor/cloud/domain/Cloud/repository/DeleteFileRepo';
import {DeleteFile} from '@copor/cloud/domain/Cloud/interactor/DeleteFile';

describe('Delete File tests', () => {
	const mockRepo: jest.Mocked<DeleteFileRepo> = {
		delete: jest.fn()
	};
	const deleteFile = new DeleteFile('File-id', mockRepo);

	it('Should delete a File', async () => {
		await deleteFile.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('File-id');
	});
});
