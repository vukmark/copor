import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDataForDeleteTag, LogDeleteTag} from '@copor/core/domain/Components/Tag/logger/LogDeleteTag';

describe('log delete tag tests', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteTag>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'user-id';
	const logData: LogDataForDeleteTag = {tagId: 'deleted_tag_id'};
	const expectedLogForSave: LogForSave<LogDataForDeleteTag> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteTag',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should log deletion tag', async () => {
		const logger = new LogDeleteTag(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
