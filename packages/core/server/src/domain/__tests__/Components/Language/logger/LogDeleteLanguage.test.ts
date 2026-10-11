import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForDeleteLanguage, LogDeleteLanguage} from '@copor/core/domain/Components/Language/logger/LogDeleteLanguage';

describe('Log delete language tests', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteLanguage>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForDeleteLanguage = {languageId: 'deletedCountryId'};
	const expectedLogForSave: LogForSave<LogDataForDeleteLanguage> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteLanguage',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log deletion of a language', async () => {
		const logger = new LogDeleteLanguage(repo, logDetails, logData);

		await logger.log();
		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
