import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForDeleteImage, LogDeleteImage} from '@copor/core/domain/Components/Image/logger/LogDeleteImage';

describe('log delete image tests', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteImage>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'user-id';
	const logData: LogDataForDeleteImage = {imageId: 'deleted_image_id'};
	const expectedLogForSave: LogForSave<LogDataForDeleteImage> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteImage',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should log deletion of image', async () => {
		const logger = new LogDeleteImage(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});