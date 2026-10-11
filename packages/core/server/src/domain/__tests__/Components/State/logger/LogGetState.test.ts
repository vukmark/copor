import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDataForGetState, LogGetState} from '@copor/core/domain/Components/State/logger/LogGetState';

describe('Log get state', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetState>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetState = {stateId: 'stateId'};
	const expectedLogForSave: LogForSave<LogDataForGetState> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getState',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log get state', async () => {
		const logger = new LogGetState(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
