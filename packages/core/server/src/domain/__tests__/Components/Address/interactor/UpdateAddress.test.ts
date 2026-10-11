import {SaveAddressDTO} from '@copor/core/domain/Components/Address/interactor/dto/SaveAddressDTO';
import {SaveAddressRepo} from '@copor/core/domain/Components/Address/repository/SaveAddressRepo';
import {UpdateAddress} from '@copor/core/domain/Components/Address/interactor/UpdateAddress';

describe('Update address interactor tests', () => {
	const mockRepo: jest.Mocked<SaveAddressRepo> = {
		save: jest.fn()
	};
	const input: SaveAddressDTO = {
		id: '12345',
		country: 'USA',
		state: 'California',
		streetAddress: '123 Main St',
		city: 'Los Angeles',
		postalCode: '90001',
		actorId: 'aid'
	};

	it('should update address', async () => {
		const interactor = new UpdateAddress(input, mockRepo);

		await interactor.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});