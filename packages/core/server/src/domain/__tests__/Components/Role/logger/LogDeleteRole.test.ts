import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForDeleteRole, LogDeleteRole} from '@copor/core/domain/Components/Role/logger/LogDeleteRole';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log delete role test', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteRole>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForDeleteRole = {roleId: 'deletedRoleId'};
	const expectedLogForSave: LogForSave<LogDataForDeleteRole> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteRole',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log deletion of a role', async () => {
		const logger = new LogDeleteRole(repo, logDetails, logData);

		await logger.log();
		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
