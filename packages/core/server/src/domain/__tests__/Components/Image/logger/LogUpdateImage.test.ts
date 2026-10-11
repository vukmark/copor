import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForUpdateImage, LogUpdateImage} from '@copor/core/domain/Components/Image/logger/LogUpdateImage';

describe('Log update image tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdateImage>> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdateImage = {
		id: '987fbc9e-4a0a-4c4f-b3b5-6f8c2a5d6a33',
		name: 'new-image',
		extension: 'png',
		fileSize: 512000,
		width: 1280,
		height: 720,
		path: '/logs/images/new-image.png'
	};

	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForUpdateImage> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateImage',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogUpdateImage = new LogUpdateImage(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});