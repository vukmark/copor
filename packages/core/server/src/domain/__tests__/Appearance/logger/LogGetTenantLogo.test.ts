import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForGetTenantLogo, LogGetTenantLogo} from '@copor/core/domain/Appearance/logger/LogGetTenantLogo';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log create user test', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetTenantLogo>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const userId = 'user_id';
	const logData: LogDataForGetTenantLogo = {tenantLogoId: 'tenant-logo-id'};
	const expectedLogCreate: LogForSave<LogDataForGetTenantLogo> = {
		actionTime: actionTime,
		actorUserId: userId,
		actionType: 'getTenantLogo',
		logData: logData
	};
	const logDetails = new LogDetails(userId);

	it('should log action', async () => {
		const logger = new LogGetTenantLogo(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogCreate);
	});
});