import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForUpdateRole, LogUpdateRole} from '@copor/core/domain/Components/Role/logger/LogUpdateRole';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

describe('log update role tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdateRole>> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdateRole = {
		id: 'role-id',
		name: 'name',
		type: RoleType.USER
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForUpdateRole> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateRole',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogUpdateRole = new LogUpdateRole(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
