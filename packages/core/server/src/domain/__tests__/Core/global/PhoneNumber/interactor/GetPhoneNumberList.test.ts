import {GetPhoneNumberListRepo} from '@copor/core/domain/Core/global/PhoneNumber/repository/GetPhoneNumberListRepo';
import {GetPhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/GetPhoneNumberDTO';
import {PhoneNumberType} from '@copor/core/domain/Core/global/PhoneNumber/PhoneNumberType';
import {GetPhoneNumberList} from '@copor/core/domain/Core/global/PhoneNumber/interactor/GetPhoneNumberList';

describe('get list of phone numbers for user', () => {
	const mockRepo: jest.Mocked<GetPhoneNumberListRepo> = {
		list: jest.fn()
	};
	const expectedResponse: GetPhoneNumberDTO[] = [{
		id: 'id',
		user: 'user',
		phoneNumber: 'string',
		phoneNumberType: PhoneNumberType.PHONE_HOME
	}];

	const getPhoneNumberList: GetPhoneNumberList = new GetPhoneNumberList('userId', mockRepo);

	it('should return list of phone numbers for specific user', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getPhoneNumberList.execute()).toEqual(expectedResponse);
	});
});