import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {
	LogSetPermissionListToUser,
	LogDataForSetPermissionListToUser
} from '@copor/core/domain/Components/Permission/logger/LogSetPermissionListToUser';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';

describe('log giving permissions to a user', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForSetPermissionListToUser>> = {
		save: jest.fn()
	};
	const logData: LogDataForSetPermissionListToUser = {
		userId: 'someId',
		permissionList: [{
			permissionType: CorePermission.canCreateUser,
			scope: PermissionScope.ALL,
					effect: PermissionEffect.ALLOW
		}]
	};
	const actorId = 'userId';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForSetPermissionListToUser> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'setPermissionListToUser',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('should successfully log action', async () => {
		const logger: LogSetPermissionListToUser = new LogSetPermissionListToUser(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});