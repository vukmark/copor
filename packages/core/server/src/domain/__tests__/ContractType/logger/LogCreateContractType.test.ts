import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogCreateContractType,
	LogDataForCreateContractType
} from '@copor/core/domain/Components/ContractType/logger/LogCreateContractType';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('log create ContractType tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateContractType>> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateContractType = {
		id: 'id',
		name: 'name',
		file: 'file',
		description: 'description',
		publishStatus: PublishStatus.published
	};
	const actorId = 'actorId';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForCreateContractType> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createContractType',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should successfully log action', async () => {
		const logger: LogCreateContractType = new LogCreateContractType(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
