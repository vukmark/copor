import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {
	LogDataForGetUserPermissionList,
	LogGetUserSpecificPermissionList
} from '@copor/core/domain/Components/Permission/logger/LogGetUserSpecificPermissionList';


describe('log get user permission list tests', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetUserPermissionList>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetUserPermissionList = {userId: 'userId'};
	const expectedLogForSave: LogForSave<LogDataForGetUserPermissionList> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getUserPermissionList',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log get user permission list', async () => {
		const logger = new LogGetUserSpecificPermissionList(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
