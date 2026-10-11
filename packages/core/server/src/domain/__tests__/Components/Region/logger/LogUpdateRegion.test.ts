import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForUpdateRegion, LogUpdateRegion} from '@copor/core/domain/Components/Region/logger/LogUpdateRegion';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log update region tests', () => {
	const mockRepo: LogRepository<LogDataForUpdateRegion> = {
		save: jest.fn()
	};

	const logData: LogDataForUpdateRegion = {
		id: 'unique-id',
		country: '1',
		state: '1',
		postalCode: '34521',
		city: 'Riessa',
		community: 'Landkreis Meissen',
		communityCode: '8685',
		latitude: 51.30260,
		longitude: 51.30260
	};

	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForUpdateRegion> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateRegion',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('should successfully log action', async () => {
		const logger: LogUpdateRegion = new LogUpdateRegion(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
