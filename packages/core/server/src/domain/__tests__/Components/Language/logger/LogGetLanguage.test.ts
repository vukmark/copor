import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForGetLanguage, LogGetLanguage} from '@copor/core/domain/Components/Language/logger/LogGetLanguage';

describe('Log get language', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetLanguage>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetLanguage = {languageId: 'language-Id'};
	const expectedLogForSave: LogForSave<LogDataForGetLanguage> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getLanguage',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log get language', async () => {
		const logger = new LogGetLanguage(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
