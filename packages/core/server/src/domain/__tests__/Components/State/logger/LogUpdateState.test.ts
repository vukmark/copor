import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForUpdateState, LogUpdateState} from '@copor/core/domain/Components/State/logger/LogUpdateState';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('Log update state tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdateState>> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdateState = {
		id: 'sId',
		name: 'Bayern',
		code: 'BY',
		countryId: 'cId'
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForUpdateState> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateState',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogUpdateState = new LogUpdateState(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});