import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogDataForDeletePhoneNumber,
	LogDeletePhoneNumber
} from '@copor/core/domain/Core/global/PhoneNumber/logger/LogDeletePhoneNumber';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('log delete phone number tests', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeletePhoneNumber>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'actorId';
	const logData: LogDataForDeletePhoneNumber = {id: 'phoneId'};
	const expectedLogForSave: LogForSave<LogDataForDeletePhoneNumber> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deletePhoneNumber',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should log deletion of phone number', async () => {
		const logger = new LogDeletePhoneNumber(repo, logDetails, logData);

		await logger.log();
		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
