import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogDataForGetUserContactInformation, LogGetUserContactInformation
} from '@copor/contacts/domain/Contacts/GetUserContactInformation/logger/LogGetUserContactInformation';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('update log get user contact information', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForGetUserContactInformation>> = {
		save: jest.fn()
	};

	const logData: LogDataForGetUserContactInformation = {
		userId: 'userId'
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForGetUserContactInformation> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getUserContactInformation',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger = new LogGetUserContactInformation(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});