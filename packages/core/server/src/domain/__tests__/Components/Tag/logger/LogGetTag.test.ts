import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetTag, LogGetTag} from '@copor/core/domain/Components/Tag/logger/LogGetTag';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('log get tag tests', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetTag>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'actorId';
	const logData: LogDataForGetTag = {tag: 'tagId'};
	const expectedLogForSave: LogForSave<LogDataForGetTag> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getTag',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('should log get tag', async () => {
		const logger = new LogGetTag(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});