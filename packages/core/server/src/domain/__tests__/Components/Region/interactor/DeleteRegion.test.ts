import {DeleteRegion} from '@copor/core/domain/Components/Region/interactor/DeleteRegion';
import {DeleteRegionRepo} from '@copor/core/domain/Components/Region/repository/DeleteRegionRepo';

describe('Delete region tests', () => {
	const mockRepo: jest.Mocked<DeleteRegionRepo> = {
		delete: jest.fn()
	};

	const deleteRegion: DeleteRegion = new DeleteRegion('uuid', mockRepo);

	it('Should delete region', async () => {
		await deleteRegion.execute();

		expect(mockRepo.delete).toHaveBeenCalledWith('uuid');
	});
});