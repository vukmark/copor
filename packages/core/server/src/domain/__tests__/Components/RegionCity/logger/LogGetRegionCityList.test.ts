import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogGetRegionCityList} from '@copor/core/domain/Components/RegionCity/logger/LogGetRegionCityList';

describe('Log get region-city list test', () => {
	const repo: jest.Mocked<NoDataLogRepository> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const userId = 'user-id';
	const expectedLogCreate: LogForSaveWithNoData = {
		actionTime: actionTime,
		actorUserId: userId,
		actionType: 'getRegionCityList'
	};
	const logDetails = new LogDetails(userId);

	it('Should log action', async () => {
		const logger = new LogGetRegionCityList(repo, logDetails);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogCreate);
	});
});