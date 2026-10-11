import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogDataForUpdateContractType,
	LogUpdateContractType
} from '@copor/core/domain/Components/ContractType/logger/LogUpdateContractType';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('log update contract type tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdateContractType>> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdateContractType = {
		id: 'id',
		name: 'name',
		file: 'file',
		description: 'description',
		publishStatus: PublishStatus.published
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForUpdateContractType> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateContractType',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogUpdateContractType = new LogUpdateContractType(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
