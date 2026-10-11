import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetRegionCity, LogGetRegionCity} from '@copor/core/domain/Components/RegionCity/logger/LogGetRegionCity';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('log get region-city test', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetRegionCity>> = {
		save: jest.fn()
	};

	const actionTime = new CurrentUTCDate();
	const userId = 'user-id';
	const logData: LogDataForGetRegionCity = {regionCity: 'region_id'};
	const expectedLogCreate: LogForSave<LogDataForGetRegionCity> = {
		actionTime: actionTime,
		actorUserId: userId,
		actionType: 'getRegionCity',
		logData: logData
	};
	const logDetails = new LogDetails(userId);

	it('should log action', async () => {
		const logger = new LogGetRegionCity(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogCreate);
	});
});