import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogCreateUser, LogDataForCreateUser} from '@copor/core/domain/User/logger/LogCreateUser';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('log create user', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateUser>> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateUser = {
		username: 'user.name',
		password: 'password',
		email: 'a@a.com',
		isActive: false
	};

	const actionTime = new CurrentUTCDate();
	const actorId = 'user-id';
	const expectedLog: LogForSave<LogDataForCreateUser> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createUser',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should successfully log action', async () => {
		const logger: LogCreateUser = new LogCreateUser(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});