import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForGetImage, LogGetImage} from '@copor/core/domain/Components/Image/logger/LogGetImage';

describe('Log get image', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetImage>> = {
		save: jest.fn()
	};

	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetImage = {image: 'image-Id'};

	const expectedLogForSave: LogForSave<LogDataForGetImage> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getImage',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log get image', async () => {
		const logger = new LogGetImage(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
