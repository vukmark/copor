import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogDataForDeleteContractType,
	LogDeleteContractType
} from '@copor/core/domain/Components/ContractType/logger/LogDeleteContractType';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('Log deletion of a contract type', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteContractType>> = {
		save: jest.fn()
	};

	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForDeleteContractType = {contractTypeId: 'deleteContractType'};
	const expectedLogForSave: LogForSave<LogDataForDeleteContractType> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteContractType',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log deletion of a Contract Type', async () => {
		const logger = new LogDeleteContractType(repo, logDetails, logData);

		await logger.log();
		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
