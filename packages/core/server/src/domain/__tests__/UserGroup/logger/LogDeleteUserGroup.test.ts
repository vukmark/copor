import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDataForDeleteUserGroup,
 LogDeleteUserGroup} from '@copor/core/domain/UserGroup/logger/LogDeleteUserGroup';

describe('log delete UserGroup tests', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteUserGroup>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'user-id';
	const logData: LogDataForDeleteUserGroup = {
		id: 'id'
	};
	const expectedLogForSave: LogForSave<LogDataForDeleteUserGroup> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteUserGroup',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should log deletion of UserGroup', async () => {
		const logger: LogDeleteUserGroup = new LogDeleteUserGroup(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
