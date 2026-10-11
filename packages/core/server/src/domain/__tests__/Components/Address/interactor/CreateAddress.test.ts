import {CreateAddress} from '@copor/core/domain/Components/Address/interactor/CreateAddress';
import {SaveAddressDTO} from '@copor/core/domain/Components/Address/interactor/dto/SaveAddressDTO';
import {SaveAddressRepo} from '@copor/core/domain/Components/Address/repository/SaveAddressRepo';

describe('create address interactor tests', () => {
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

	it('should save address', async () => {
		const interactor = new CreateAddress(input, mockRepo);

		await interactor.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});