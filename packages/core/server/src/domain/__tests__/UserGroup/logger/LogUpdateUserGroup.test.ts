import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForUpdateUserGroup, LogUpdateUserGroup} from '@copor/core/domain/UserGroup/logger/LogUpdateUserGroup';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log update UserGroup tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdateUserGroup>> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdateUserGroup = {
		id: 'id',
		name: 'nnn'
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForUpdateUserGroup> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateUserGroup',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogUpdateUserGroup = new LogUpdateUserGroup(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
