import {ContractType} from '@copor/core/domain/Core/enum/ContractType';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForSignContract, LogSignContract} from '@copor/core/domain/Contract/logger/LogSignContract';


describe('Log sign contract tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForSignContract>> = {
		save: jest.fn()
	};
	const logData: LogDataForSignContract = {
		contractType: ContractType.TERMS_AND_CONDITIONS
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForSignContract> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'signContract',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogSignContract = new LogSignContract(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
