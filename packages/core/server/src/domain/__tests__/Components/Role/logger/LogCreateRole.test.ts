import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogCreateRole, LogDataForCreateRole} from '@copor/core/domain/Components/Role/logger/LogCreateRole';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

describe('log create role tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateRole>> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateRole = {
		id: 'unique-id',
		name: 'name',
		type: RoleType.USER
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForCreateRole> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createRole',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should successfully log action', async () => {
		const logger: LogCreateRole = new LogCreateRole(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
