import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForGetStateList, LogGetStateList} from '@copor/core/domain/Components/State/logger/LogGetStateList';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('Log getting the state list for a country', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForGetStateList>> = {
		save: jest.fn()
	};
	const logData: LogDataForGetStateList = {
		countryId: 'some-country-id'
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'user-id';
	const expectedLog: LogForSave<LogDataForGetStateList> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getStateList',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should successfully log action of getting states for a country', async () => {
		const logger: LogGetStateList = new LogGetStateList(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});