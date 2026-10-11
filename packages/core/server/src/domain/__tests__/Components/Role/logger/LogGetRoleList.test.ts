import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogGetRoleList} from '@copor/core/domain/Components/Role/logger/LogGetRoleList';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log get role list tests', () => {
	const mockRepo: jest.Mocked<NoDataLogRepository> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const userId = 'user_id';
	const expectedLogCreate: LogForSaveWithNoData = {
		actionTime: actionTime,
		actorUserId: userId,
		actionType: 'getRoleList'
	};
	const logDetails = new LogDetails(userId);

	it('should log action', async () => {
		const logger = new LogGetRoleList(mockRepo, logDetails);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLogCreate);
	});
});
