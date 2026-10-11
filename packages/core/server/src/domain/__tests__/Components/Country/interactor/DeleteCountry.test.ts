import {DeleteCountryRepo} from '@copor/core/domain/Components/Country/repository/DeleteCountryRepo';
import {DeleteCountry} from '@copor/core/domain/Components/Country/interactor/DeleteCountry';

describe('Delete country', () => {
	const mockRepo: jest.Mocked<DeleteCountryRepo> = {
		delete: jest.fn()
	};
	const deleteCountry = new DeleteCountry('country-id', mockRepo);

	it('Should delete a country', async () => {
		await deleteCountry.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('country-id');
	});
});