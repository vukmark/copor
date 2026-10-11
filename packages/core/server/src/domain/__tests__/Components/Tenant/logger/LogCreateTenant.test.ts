import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogCreateTenant, LogDataForCreateTenant} from '@copor/core/domain/Components/Tenant/logger/LogCreateTenant';

describe('log create tenant tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateTenant>> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateTenant = {
		id: 'id',
		name: 'name',
		isBaseTenant: true,
		addressStreet: '123 Main Street',
		regionCityId: 'region-id',
		publishStatus: PublishStatus.published,
		email: 'tenant@example.com',
		phoneNumber: '123-456-7890',
		contract: 'Contract123',
		contractSignedBy: 'Jane Doe',
		contractFileName: 'contract.pdf',
		contactName: 'Chris White',
		contactDepartment: 'Support',
		contactAddress: '456 Elm Street',
		contactPostalCode: '54321',
		contactCity: 'Secondary City',
		contactPhone: '555-123-4567',
		contactEmail: 'contact@example.com'
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForCreateTenant> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createTenant',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogCreateTenant = new LogCreateTenant(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
