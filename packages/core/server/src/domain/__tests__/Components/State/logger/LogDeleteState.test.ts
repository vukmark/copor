import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDataForDeleteState, LogDeleteState} from '@copor/core/domain/Components/State/logger/LogDeleteState';

describe('log delete state test', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteState>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForDeleteState = {stateId: 'deletedStateId'};
	const expectedLogForSave: LogForSave<LogDataForDeleteState> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteState',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log deletion of a state', async () => {
		const logger = new LogDeleteState(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
