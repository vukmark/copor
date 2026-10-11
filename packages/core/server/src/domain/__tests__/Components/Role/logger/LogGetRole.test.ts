import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForGetRole, LogGetRole} from '@copor/core/domain/Components/Role/logger/LogGetRole';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('Log get role', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetRole>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetRole = {roleId: 'role-id'};
	const expectedLogForSave: LogForSave<LogDataForGetRole> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getRole',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log get role', async () => {
		const logger = new LogGetRole(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
