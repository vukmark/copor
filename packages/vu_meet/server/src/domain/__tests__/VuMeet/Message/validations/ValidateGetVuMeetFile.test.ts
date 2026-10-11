import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateGetVuMeetFile} from '@copor/vu_meet/domain/VuMeet/Message/validations/ValidateGetVuMeetFile';
import {ValidateGetVuMeetFileDTO} from '@copor/vu_meet/domain/VuMeet/Message/validations/dto/ValidateGetVuMeetFileDTO';
import {ValidateGetVuMeetFileRepo} from '@copor/vu_meet/domain/VuMeet/Message/repository/ValidateGetVuMeetFileRepo';
import {UserNotInChatException} from '@copor/vu_meet/domain/VuMeet/Core/exception/UserNotInChatException';

describe('Test validate get VuMeetFile', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetVuMeetFileRepo>;
	const input: ValidateGetVuMeetFileDTO = {
		actorId: 'actorID',
		messageId: 'mid'
	};

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};

		mockStorageRepo = {
			isUserNotInChatOfMessage: jest.fn()
		};

		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isUserNotInChatOfMessage.mockResolvedValue(false);
	});

	it('Should throw error if user does not have permission', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateGetVuMeetFile = new ValidateGetVuMeetFile(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if user is not in chat', async () => {
		const errorList = new ErrorList([new UserNotInChatException()]);

		mockStorageRepo.isUserNotInChatOfMessage.mockResolvedValue(true);
		const validator: ValidateGetVuMeetFile = new ValidateGetVuMeetFile(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});