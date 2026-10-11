import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {
	LogGetAllPermissionsForUser,
	LogDataForGetAllPermissionsForUser
} from '@copor/core/domain/Components/Permission/logger/LogGetAllPermissionsForUser';

describe('log get all permissions test', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetAllPermissionsForUser>> = {
		save: jest.fn()
	};

	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';

	const logData: LogDataForGetAllPermissionsForUser = {
		userId: 'userIdToCheck'
	};

	const expectedLogForSave: LogForSave<LogDataForGetAllPermissionsForUser> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getAllPermissionsForUser',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should log get activity type', async () => {
		const logger = new LogGetAllPermissionsForUser(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
