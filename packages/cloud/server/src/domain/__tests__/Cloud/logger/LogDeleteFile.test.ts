import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDataForDeleteFile,
	LogDeleteFile} from '@copor/cloud/domain/Cloud/logger/LogDeleteFile';

describe('log delete File tests', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteFile>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'user-id';
	const logData: LogDataForDeleteFile = {
		fileId: 'id'
	};
	const expectedLogForSave: LogForSave<LogDataForDeleteFile> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteFile',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should log deletion of File', async () => {
		const logger: LogDeleteFile = new LogDeleteFile(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
