import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogCreateCountry, LogDataForCreateCountry} from '@copor/core/domain/Components/Country/logger/LogCreateCountry';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log create country tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateCountry>> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateCountry = {
		id: 'unique-id',
		name: 'Serbia',
		code: 'RS'
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForCreateCountry> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createCountry',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should successfully log action', async () => {
		const logger: LogCreateCountry = new LogCreateCountry(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
