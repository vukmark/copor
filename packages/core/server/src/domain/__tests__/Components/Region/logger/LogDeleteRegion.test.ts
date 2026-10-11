import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForDeleteRegion, LogDeleteRegion} from '@copor/core/domain/Components/Region/logger/LogDeleteRegion';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log delete region tests', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteRegion>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'user-id';
	const logData: LogDataForDeleteRegion = {regionId: 'deleted_region_id'};
	const expectedLogForSave: LogForSave<LogDataForDeleteRegion> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteRegion',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should log deletion of a region', async () => {
		const logger = new LogDeleteRegion(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
