import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForDeleteCountry, LogDeleteCountry} from '@copor/core/domain/Components/Country/logger/LogDeleteCountry';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('Log deletion of a country', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteCountry>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForDeleteCountry = {countryId: 'deletedCountryId'};
	const expectedLogForSave: LogForSave<LogDataForDeleteCountry> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteCountry',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log deletion of a country', async () => {
		const logger = new LogDeleteCountry(repo, logDetails, logData);

		await logger.log();
		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});