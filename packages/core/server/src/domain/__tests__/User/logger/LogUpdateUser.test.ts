import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogUpdateUser, LogDataForUpdateUser} from '@copor/core/domain/User/logger/LogUpdateUser';

describe('log update user test', () => {
	const repo: jest.Mocked<LogRepository<LogDataForUpdateUser>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorUserId = 'actorId';
	const logData: LogDataForUpdateUser = {
		id: 'someId',
		username: 'user.name',
		password: 'password',
		email: 'a@a.com',
		isActive: false
	};
	const logForSave: LogForSave<LogDataForUpdateUser> = {
		actionTime: actionTime,
		actorUserId: actorUserId,
		actionType: 'updateUser',
		logData: logData
	};
	const logDetails = new LogDetails(actorUserId);

	it('Should have class', async () => {
		const logger = new LogUpdateUser(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(logForSave);
	});
});