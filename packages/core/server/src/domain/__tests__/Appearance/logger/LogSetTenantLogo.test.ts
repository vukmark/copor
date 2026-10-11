import {LogDataForSetTenantLogo, LogSetTenantLogo} from '@copor/core/domain/Appearance/logger/LogSetTenantLogo';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('LogSetTenantLogo', () => {
	const repo: jest.Mocked<LogRepository<LogDataForSetTenantLogo>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const userId = 'user_id';
	const logData: LogDataForSetTenantLogo = {
		url: 'url',
		tenantLogoId: 'logo456'
	};
	const expectedLogCreate: LogForSave<LogDataForSetTenantLogo> = {
		actionTime: actionTime,
		actorUserId: userId,
		actionType: 'setTenantLogo',
		logData: logData
	};
	const logDetails = new LogDetails(userId);
	let logger: LogSetTenantLogo;

	beforeEach(() => {
		logger = new LogSetTenantLogo(repo, logDetails, logData);
	});

	it('should return correct log type', () => {
		expect(logger.getType()).toBe('setTenantLogo');
	});

	it('should log action', async () => {
		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogCreate);
	});
});