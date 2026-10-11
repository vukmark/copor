import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetUser, LogGetUser} from '@copor/core/domain/User/logger/LogGetUser';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('log get user tests', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetUser>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetUser = {id: 'get_user_id'};
	const expectedLogForSave: LogForSave<LogDataForGetUser> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getUser',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should log action', async () => {
		const logger = new LogGetUser(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});