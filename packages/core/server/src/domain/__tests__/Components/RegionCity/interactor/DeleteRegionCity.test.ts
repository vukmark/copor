import {DeleteRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/DeleteRegionCityRepo';
import {DeleteRegionCity} from '@copor/core/domain/Components/RegionCity/interactor/DeleteRegionCity';

describe('Delete region-city tests', () => {
	const mockRepo: jest.Mocked<DeleteRegionCityRepo> = {
		delete: jest.fn()
	};

	const deleteRegionCity: DeleteRegionCity = new DeleteRegionCity('uuid', mockRepo);

	it('Should delete region-city', async () => {
		await deleteRegionCity.execute();

		expect(mockRepo.delete).toHaveBeenCalledWith('uuid');
	});
});