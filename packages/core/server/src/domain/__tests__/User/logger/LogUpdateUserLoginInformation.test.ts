import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {
	LogDataForUpdateUserLoginInformation,
	LogUpdateUserLoginInformation
} from '@copor/core/domain/User/logger/LogUpdateUserLoginInformation';

describe('update user login information logger tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdateUserLoginInformation>> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdateUserLoginInformation = {
		userId: 'uId',
		oldPassword: 'oldPass'
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForUpdateUserLoginInformation> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateUserLoginInformation',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger = new LogUpdateUserLoginInformation(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
