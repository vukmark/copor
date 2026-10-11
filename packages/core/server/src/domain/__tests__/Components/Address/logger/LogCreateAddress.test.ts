import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogCreateAddress, LogDataForCreateAddress} from '@copor/core/domain/Components/Address/logger/LogCreateAddress';


describe('Test logging of creation of address', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateAddress>> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateAddress = {
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
	const expectedLog: LogForSave<LogDataForCreateAddress> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createAddress',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogCreateAddress = new LogCreateAddress(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});