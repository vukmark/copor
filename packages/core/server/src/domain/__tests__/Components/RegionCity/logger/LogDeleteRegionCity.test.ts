import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogDataForDeleteRegionCity,
	LogDeleteRegionCity
} from '@copor/core/domain/Components/RegionCity/logger/LogDeleteRegionCity';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('log delete region-city test', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteRegionCity>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'user-id';
	const logData: LogDataForDeleteRegionCity = {regionCityId: 'deleted_region_city_id'};
	const expectedLogForSave: LogForSave<LogDataForDeleteRegionCity> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteRegionCity',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);


	it('Should log deletion of a region', async () => {
		const logger = new LogDeleteRegionCity(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});