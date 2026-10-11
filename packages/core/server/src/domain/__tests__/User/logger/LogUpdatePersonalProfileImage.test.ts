import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {
	LogDataForUpdatePersonalProfileImage,
	LogUpdatePersonalProfileImage
} from '@copor/core/domain/User/logger/LogUpdatePersonalProfileImage';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log update PersonalProfileImage tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdatePersonalProfileImage>> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdatePersonalProfileImage = {
		userId: 'uid'
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForUpdatePersonalProfileImage> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updatePersonalProfileImage',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogUpdatePersonalProfileImage = new LogUpdatePersonalProfileImage(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
