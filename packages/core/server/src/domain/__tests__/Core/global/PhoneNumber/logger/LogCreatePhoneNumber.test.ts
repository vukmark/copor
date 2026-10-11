import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogCreatePhoneNumber, LogDataForCreatePhoneNumber}
	from '@copor/core/domain/Core/global/PhoneNumber/logger/LogCreatePhoneNumber';
import {PhoneNumberType} from '@copor/core/domain/Core/global/PhoneNumber/PhoneNumberType';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('log create a phone number test', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreatePhoneNumber[]>> = {
		save: jest.fn()
	};
	const logData: LogDataForCreatePhoneNumber[]
		= [
			{
				user: 'user',
				phoneNumber: 'number',
				phoneNumberType: PhoneNumberType.PHONE_MOBILE
			}
		];

	const actorId = 'userId';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForCreatePhoneNumber[]> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createPhoneNumber',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('should log action', async () => {
		const logger: LogCreatePhoneNumber = new LogCreatePhoneNumber(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});