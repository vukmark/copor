import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogCreateUserGroup,
	LogDataForCreateUserGroup
} from '@copor/core/domain/UserGroup/logger/LogCreateUserGroup';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('Log create UserGroup tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateUserGroup>> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateUserGroup = {
		id: 'id',
		name: 'name',
		parentUserGroupId: 'pid'
	};
	const actorId = 'user-id';

	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForCreateUserGroup> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createUserGroup',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogCreateUserGroup = new LogCreateUserGroup(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
