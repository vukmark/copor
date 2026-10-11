import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForUpdateCountry, LogUpdateCountry} from '@copor/core/domain/Components/Country/logger/LogUpdateCountry';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log update country tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdateCountry>> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdateCountry = {
		id: 'id',
		name: 'name',
		code: 'code'
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForUpdateCountry> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateCountry',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogUpdateCountry = new LogUpdateCountry(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
