import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForGetTenant, LogGetTenant} from '@copor/core/domain/Components/Tenant/logger/LogGetTenant';

describe('get tenant logger tests', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetTenant>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetTenant = {tenantId: 'tenant-id'};
	const expectedLogForSave: LogForSave<LogDataForGetTenant> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getTenant',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log get activity type', async () => {
		const logger = new LogGetTenant(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
