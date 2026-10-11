import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogGetRegionList} from '@copor/core/domain/Components/Region/logger/LogGetRegionList';

describe('Log get region list tests', () => {
	const repo: jest.Mocked<NoDataLogRepository> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const userId = 'user-id';
	const expectedLogCreate: LogForSaveWithNoData = {
		actionTime: actionTime,
		actorUserId: userId,
		actionType: 'getRegionList'
	};
	const logDetails = new LogDetails(userId);

	it('Should log action', async () => {
		const logger = new LogGetRegionList(repo, logDetails);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogCreate);
	});
});