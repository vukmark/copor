import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogCreateState, LogDataForCreateState} from '@copor/core/domain/Components/State/logger/LogCreateState';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('Log create state tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateState>> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateState = {
		id: 'unique-id',
		name: 'Bayern',
		code: 'BY',
		countryId: 'someCountryId'
	};
	const actorId = 'userId';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForCreateState> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createState',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogCreateState = new LogCreateState(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});