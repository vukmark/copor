import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogCreateImage, LogDataForCreateImage} from '@copor/core/domain/Components/Image/logger/LogCreateImage';

describe('Create Image Logger tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateImage>> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateImage = {
		id: '987fbc9e-4a0a-4c4f-b3b5-6f8c2a5d6a33',
		name: 'new-image',
		extension: 'png',
		fileSize: 512000,
		width: 1280,
		height: 720
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForCreateImage> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createImage',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogCreateImage = new LogCreateImage(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});