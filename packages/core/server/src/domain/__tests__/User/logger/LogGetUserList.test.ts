import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogGetUserList} from '@copor/core/domain/User/logger/LogGetUserList';


describe('Log get user list', () => {
	const repo: jest.Mocked<NoDataLogRepository> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const expectedLogCreate: LogForSaveWithNoData = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getUserList'
	};
	const logDetails = new LogDetails(actorId);

	it('Should log action', async () => {
		const logger = new LogGetUserList(repo, logDetails);

		await logger.log();
		expect(repo.save).toHaveBeenCalledWith(expectedLogCreate);
	});
});