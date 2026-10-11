import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {LogDataForUpdateLanguage, LogUpdateLanguage} from '@copor/core/domain/Components/Language/logger/LogUpdateLanguage';

describe('Log update language tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdateLanguage>> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdateLanguage = {
		id: 'some-id',
		name: 'Country',
		code: 'code',
		nativeName: 'nativeName',
		publishStatus: PublishStatus.published,
		actorId: 'crId'
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForUpdateLanguage> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateLanguage',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogUpdateLanguage = new LogUpdateLanguage(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});