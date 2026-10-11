import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetUser} from '@copor/core/domain/User/logger/LogGetUser';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDataForGetContactInfoForUser, LogGetContactInfoForUser} from '@copor/contacts/domain/Contacts/logger/LogGetContactInfoForUser';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('log get user tests', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetUser>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetContactInfoForUser = {id: 'get_contact_id'};
	const expectedLogForSave: LogForSave<LogDataForGetContactInfoForUser> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getContactById',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should log action', async () => {
		const logger = new LogGetContactInfoForUser(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});