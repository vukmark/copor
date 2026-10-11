import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForDeleteUser, LogDeleteUser} from '@copor/core/domain/User/logger/LogDeleteUser';

describe('test log deleting user', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteUser>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'user_id';
	const logData: LogDataForDeleteUser = {deletedUserId: 'deleted_user_id'};
	const expectedLogForSave: LogForSave<LogDataForDeleteUser> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteUser',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should log action', async () => {
		const logger = new LogDeleteUser(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});