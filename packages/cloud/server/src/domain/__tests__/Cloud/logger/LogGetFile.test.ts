import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForGetFile, LogGetFile} from '@copor/cloud/domain/Cloud/logger/LogGetFile';

describe('Log get File', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetFile>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetFile = {
		fileId: 'fid'
	};
	const expectedLogForSave: LogForSave<LogDataForGetFile> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getFile',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log get File', async () => {
		const logger = new LogGetFile(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
