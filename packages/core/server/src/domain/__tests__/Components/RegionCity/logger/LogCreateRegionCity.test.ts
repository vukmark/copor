import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogCreateRegionCity,
	LogDataForCreateRegionCity
} from '@copor/core/domain/Components/RegionCity/logger/LogCreateRegionCity';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('log create region-city tests', () => {
	const mockRepo: LogRepository<LogDataForCreateRegionCity> = {
		save: jest.fn()
	};

	const logData: LogDataForCreateRegionCity = {
		id: 'unique-id',
		city: 'city',
		community: 'community',
		communityCode: 'communityCode',
		latitude: 0,
		longitude: 0,
		province: 'province',
		provinceCode: 'provinceCode',
		regionId: 'regionId'
	};

	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForCreateRegionCity> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createRegionCity',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('should successfully log action', async() => {
		const logger: LogCreateRegionCity = new LogCreateRegionCity(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});