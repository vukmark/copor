import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForUpdateTenant, LogUpdateTenant} from '@copor/core/domain/Components/Tenant/logger/LogUpdateTenant';

describe('Log update tenant tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdateTenant>> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdateTenant = {
		id: 'someId',
		name: 'someName',
		isBaseTenant: false,
		addressStreet: 'someAddress',
		regionCityId: 'region-id',
		publishStatus: PublishStatus.published,
		email: 'someEmail'
	};
	const actorId = 'userId';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForUpdateTenant> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateTenant',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should successfully log action', async () => {
		const logger: LogUpdateTenant = new LogUpdateTenant(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});