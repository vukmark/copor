import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogCreateFile,
	LogDataForCreateFile
} from '@copor/cloud/domain/Cloud/logger/LogCreateFile';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('Log create File tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateFile>> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateFile = {
		fileId: 'fid'
	};
	const actorId = 'user-id';

	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForCreateFile> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createFile',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogCreateFile = new LogCreateFile(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
