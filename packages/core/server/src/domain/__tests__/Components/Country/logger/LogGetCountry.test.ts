import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForGetCountry, LogGetCountry} from '@copor/core/domain/Components/Country/logger/LogGetCountry';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('Log get of a country', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetCountry>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetCountry = {countryId: 'countryId'};
	const expectedLogForSave: LogForSave<LogDataForGetCountry> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getCountry',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log get of a country', async () => {
		const logger = new LogGetCountry(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
