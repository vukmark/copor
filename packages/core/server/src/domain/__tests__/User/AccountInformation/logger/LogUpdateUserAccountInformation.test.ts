import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {
	LogDataForUpdateUserAccountInformation,
	LogUpdateUserAccountInformation
} from '@copor/core/domain/User/logger/LogUpdateUserAccountInformation';

describe('update user account information logger tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdateUserAccountInformation>> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdateUserAccountInformation = {
		id: 'uid',
		firstName: 'name',
		lastName: 'name',
		address: 'address',
		postalCode: '123123',
		city: 'city',
		country: 'cid',
		state: 'sid',
		citizenship: 'cz',
		email: 'mail'
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForUpdateUserAccountInformation> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateUserAccountInformation',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger = new LogUpdateUserAccountInformation(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
