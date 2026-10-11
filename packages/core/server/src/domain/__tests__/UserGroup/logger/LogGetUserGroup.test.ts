import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForGetUserGroup, LogGetUserGroup} from '@copor/core/domain/UserGroup/logger/LogGetUserGroup';

describe('Log get UserGroup', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetUserGroup>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetUserGroup = {
		id: 's'
	};
	const expectedLogForSave: LogForSave<LogDataForGetUserGroup> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getUserGroup',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log get UserGroup', async () => {
		const logger = new LogGetUserGroup(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
