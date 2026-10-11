import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogCreateRegion, LogDataForCreateRegion} from '@copor/core/domain/Components/Region/logger/LogCreateRegion';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log create region tests', () => {
	const mockRepo: LogRepository<LogDataForCreateRegion> = {
		save: jest.fn()
	};

	const logData: LogDataForCreateRegion = {
		id: 'unique-id',
		country: 'country',
		postalCode: 'postalCode',
		state: 'state'
	};

	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForCreateRegion> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createRegion',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('should successfully log action', async() => {
		const logger: LogCreateRegion = new LogCreateRegion(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
