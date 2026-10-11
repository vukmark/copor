import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForGetRegion, LogGetRegion} from '@copor/core/domain/Components/Region/logger/LogGetRegion';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log get region test', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetRegion>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const userId = 'user_id';
	const logData: LogDataForGetRegion = {region: 'region_id'};
	const expectedLogCreate: LogForSave<LogDataForGetRegion> = {
		actionTime: actionTime,
		actorUserId: userId,
		actionType: 'getRegion',
		logData: logData
	};
	const logDetails = new LogDetails(userId);

	it('should log action', async () => {
		const logger = new LogGetRegion(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogCreate);
	});
});
