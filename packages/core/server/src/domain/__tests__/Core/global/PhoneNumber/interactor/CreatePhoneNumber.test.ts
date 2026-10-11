import {CreatePhoneNumber} from '@copor/core/domain/Core/global/PhoneNumber/interactor/CreatePhoneNumber';
import {SavePhoneNumberRepo} from '@copor/core/domain/Core/global/PhoneNumber/repository/SavePhoneNumberRepo';
import {SavePhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/SavePhoneNumberDTO';
import {PhoneNumberType} from '@copor/core/domain/Core/global/PhoneNumber/PhoneNumberType';

describe('Create new phone number', () => {
	let createPhoneNumber: CreatePhoneNumber;
	let mockRepo: jest.Mocked<SavePhoneNumberRepo>;
	let input: SavePhoneNumberDTO[];

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		input = [
			{
				id: 'phoneID',
				user: 'user',
				phoneNumber: 'phoneNumber',
				phoneNumberType: PhoneNumberType.PHONE_MOBILE,
				actorId: 'someId'
			}
		];
		createPhoneNumber = new CreatePhoneNumber(input, mockRepo);
	});
	it('should save a phone number', async () => {
		await createPhoneNumber.execute();

		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});

