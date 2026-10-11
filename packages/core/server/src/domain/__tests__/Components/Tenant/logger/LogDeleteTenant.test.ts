import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForDeleteTenant, LogDeleteTenant} from '@copor/core/domain/Components/Tenant/logger/LogDeleteTenant';

describe('log delete tenant tests', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteTenant>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'someId';
	const logData: LogDataForDeleteTenant = {tenantId: 'deleted_tenant_id'};
	const expectedLogForSave: LogForSave<LogDataForDeleteTenant> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteTenant',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('should log deletion', async () => {
		const logger = new LogDeleteTenant(repo, logDetails, logData);

		await logger.log();
		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});