import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {
	LogDataForGetRolePermissionList,
	LogGetRolePermissionList
} from '@copor/core/domain/Components/Permission/logger/LogGetRolePermissionList';

describe('log get role permission list tests', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetRolePermissionList>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetRolePermissionList = {roleId: 'roleId'};
	const expectedLogForSave: LogForSave<LogDataForGetRolePermissionList> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getRolePermissionList',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log get activity type', async () => {
		const logger = new LogGetRolePermissionList(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
