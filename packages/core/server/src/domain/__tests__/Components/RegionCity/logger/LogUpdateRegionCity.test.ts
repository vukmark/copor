import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogDataForUpdateRegionCity,
	LogUpdateRegionCity
} from '@copor/core/domain/Components/RegionCity/logger/LogUpdateRegionCity';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('log update region-city tests', () => {
	const mockRepo: LogRepository<LogDataForUpdateRegionCity> = {
		save: jest.fn()
	};

	const logData: LogDataForUpdateRegionCity = {
		id: 'unique-id',
		city: 'city',
		community: 'community',
		communityCode: 'communityCode',
		latitude: 12.11552,
		longitude: 54.34221,
		province: 'province',
		provinceCode: 'provinceCode',
		regionId: 'regionId'
	};

	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForUpdateRegionCity> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateRegionCity',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('should successfully log action', async () => {
		const logger: LogUpdateRegionCity = new LogUpdateRegionCity(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});