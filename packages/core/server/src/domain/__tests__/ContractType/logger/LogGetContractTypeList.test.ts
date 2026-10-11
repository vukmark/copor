import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogGetContractTypeList} from '@copor/core/domain/Components/ContractType/logger/LogGetContractTypeList';

describe('Log get Contract Type List test', () => {
	const mockRepo:jest.Mocked<NoDataLogRepository> = {
		save: jest.fn()
	};
	const actionsTime = new CurrentUTCDate();
	const userId = 'user_id';
	const expectedLogCreate: LogForSaveWithNoData = {
		actionTime: actionsTime,
		actorUserId: userId,
		actionType: 'getContractTypeList'
	};
	const logDetails = new LogDetails(userId);

	it('should log action', async () => {
		const logger = new LogGetContractTypeList(mockRepo, logDetails);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLogCreate);
	});
});