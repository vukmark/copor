import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogDataForGetPhoneNumberList,
	LogGetPhoneNumberList
} from '@copor/core/domain/Core/global/PhoneNumber/logger/LogGetPhoneNumberList';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('Log get phone numbers', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetPhoneNumberList>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetPhoneNumberList = {userId: 'userId'};
	const expectedLogForSave: LogForSave<LogDataForGetPhoneNumberList> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getPhoneNumberList',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log get state', async () => {
		const logger = new LogGetPhoneNumberList(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});