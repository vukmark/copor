import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForUpdatePersonalData, LogUpdatePersonalData} from '@copor/core/domain/MyAccount/logger/LogUpdatePersonalData';
import {Gender} from '@copor/core/domain/Core/enum/Gender';

describe('Log update personal data test', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdatePersonalData>> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdatePersonalData = {
		id: 'some-id',
		firstName: 'firstName',
		lastName: 'lastName',
		password: 'password',
		userRole: 'role-id',
		placeOfBirth: 'placeOfBirth',
		gender: Gender.FEMALE,
		nativeLanguage: 'Deutsch'
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForUpdatePersonalData> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updatePersonalData',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogUpdatePersonalData = new LogUpdatePersonalData(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});