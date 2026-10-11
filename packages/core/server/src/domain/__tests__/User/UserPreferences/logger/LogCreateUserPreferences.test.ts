import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails, TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

interface LogDataForCreateUserPreferences {
	language: string;
}

class LogCreateUserPreferences extends TypedLogger<LogDataForCreateUserPreferences> {
	getType(): string {
		return 'createUserPreferences';
	}
}

describe('test log create user preferences', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateUserPreferences>> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateUserPreferences = {
		language: 'lid'
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForCreateUserPreferences> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createUserPreferences',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogCreateUserPreferences = new LogCreateUserPreferences(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
