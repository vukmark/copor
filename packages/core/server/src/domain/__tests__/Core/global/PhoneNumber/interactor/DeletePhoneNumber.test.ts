import {DeletePhoneNumberRepo} from '@copor/core/domain/Core/global/PhoneNumber/repository/DeletePhoneNumberRepo';
import {DeletePhoneNumber} from '@copor/core/domain/Core/global/PhoneNumber/interactor/DeletePhoneNumber';

describe('Delete phone number test', () => {
	const mockRepo: jest.Mocked<DeletePhoneNumberRepo> = {
		delete: jest.fn()
	};
	const deletePhoneNumber = new DeletePhoneNumber('phoneID', mockRepo);

	it('should delete a phone number', async () => {
		await deletePhoneNumber.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('phoneID');
	});
});