import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {LogCreateLanguage, LogDataForCreateLanguage} from '@copor/core/domain/Components/Language/logger/LogCreateLanguage';

describe('Test logging of creation of new language', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateLanguage>> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateLanguage = {
		id: 'uniqueId',
		name: 'Country',
		code: 'code',
		nativeName: 'nativeName',
		publishStatus: PublishStatus.published
	};
	const actorId = 'userId';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForCreateLanguage> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createLanguage',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogCreateLanguage = new LogCreateLanguage(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});