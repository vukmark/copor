import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetTenantActivationData, LogGetTenantActivationData}
	from '@copor/core/domain/Components/Tenant/TenantRegistration/logger/LogGetTenantActivationData';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('get base tenant registration activation data logger tests', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetTenantActivationData>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'user-id';
	const logData: LogDataForGetTenantActivationData = {
		id: 'tenantID',
		name: 'tenantName',
		contractSigned: true,
		isBaseTenant: true,
		email: 'tenantMail'
	};
	const expectedLogForSave: LogForSave<LogDataForGetTenantActivationData> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getBaseTenantActivationData',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should log get activity type', async () => {
		const logger = new LogGetTenantActivationData(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});