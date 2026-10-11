import {SavePhoneNumberRepo} from '@copor/core/domain/Core/global/PhoneNumber/repository/SavePhoneNumberRepo';
import {SavePhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/SavePhoneNumberDTO';
import {UpdatePhoneNumber} from '@copor/core/domain/Core/global/PhoneNumber/interactor/UpdatePhoneNumber';
import {PhoneNumberType} from '@copor/core/domain/Core/global/PhoneNumber/PhoneNumberType';

describe('update phone number interactor test', () => {
	let mockRepo: jest.Mocked<SavePhoneNumberRepo>;
	let input: SavePhoneNumberDTO[];
	let updatePhoneNumber: UpdatePhoneNumber;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		input = [{
			id: 'phoneID',
			user: 'user',
			phoneNumber: 'number',
			phoneNumberType: PhoneNumberType.PHONE_HOME,
			actorId: 'actorID'
		}];
		updatePhoneNumber = new UpdatePhoneNumber(input, mockRepo);
	});
	it('should save data for update phone number', async () => {
		await updatePhoneNumber.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});
