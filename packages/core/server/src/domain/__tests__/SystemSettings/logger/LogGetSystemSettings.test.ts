import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {LogGetSMTPSystemSettings} from '@copor/core/domain/SystemSettings/logger/LogGetSMTPSystemSettings';

describe('Log get SMTP System Settings', () => {
	const repo: jest.Mocked<NoDataLogRepository> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';

	const expectedLogForSave: LogForSaveWithNoData = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getSMTPSystemSettings'
	};
	const logDetails = new LogDetails(actorId);

	it('Should log get SMTP System Settings', async () => {
		const logger = new LogGetSMTPSystemSettings(repo, logDetails);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
