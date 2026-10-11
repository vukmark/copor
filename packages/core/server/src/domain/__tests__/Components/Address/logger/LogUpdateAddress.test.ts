import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForUpdateAddress, LogUpdateAddress} from '@copor/core/domain/Components/Address/logger/LogUpdateAddress';


describe('Test logging of update address', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdateAddress>> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdateAddress = {
		id: '12345',
		country: 'USA',
		state: 'California',
		streetAddress: '123 Main St',
		city: 'Los Angeles',
		postalCode: '90001',
		citizenship: 'American'
	};
	const actorId = 'userId';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForUpdateAddress> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateAddress',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogUpdateAddress = new LogUpdateAddress(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});