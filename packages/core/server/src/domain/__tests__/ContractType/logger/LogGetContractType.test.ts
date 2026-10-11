import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetContractType, LogGetContractType} from '@copor/core/domain/Components/ContractType/logger/LogGetContractType';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('Log get Contract Type', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetContractType>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetContractType = {contractTypeId: 'contractTypeId'};
	const expectedLogForSave: LogForSave<LogDataForGetContractType> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getContractType',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should log get of a Contract Type', async () => {
		const logger = new LogGetContractType(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
