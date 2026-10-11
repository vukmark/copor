import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogActivateTenant, LogDataForActivateTenant}
	from '@copor/core/domain/Components/Tenant/TenantRegistration/logger/LogActivateTenant';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('log create inactive tenant admin/activate base tenant', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForActivateTenant>> = {
		save: jest.fn()
	};
	const logData: LogDataForActivateTenant = {
		id: 'tenantID',
		firstName: 'firstName',
		lastName: 'lastName'
	};

	const actionTime = new CurrentUTCDate();
	const actorId = 'user-id';
	const expectedLog: LogForSave<LogDataForActivateTenant> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'activateBaseTenant',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should successfully log action', async () => {
		const logger: LogActivateTenant = new LogActivateTenant(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});