import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForUpdatePhoneNumber, LogUpdatePhoneNumber}
	from '@copor/core/domain/Core/global/PhoneNumber/logger/LogUpdatePhoneNumber';
import {PhoneNumberType} from '@copor/core/domain/Core/global/PhoneNumber/PhoneNumberType';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('log update phone number test', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdatePhoneNumber[]>> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdatePhoneNumber[]
        = [{id: 'phoneId', user: 'user', phoneNumber: 'number', phoneNumberType: PhoneNumberType.PHONE_MOBILE}];
	const actorId = 'userId';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForUpdatePhoneNumber[]> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updatePhoneNumber',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('should log action', async () => {
		const logger: LogUpdatePhoneNumber = new LogUpdatePhoneNumber(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});