import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {InvalidChatException} from '@copor/vu_meet/domain/VuMeet/Core/exception/InvalidChatException';
import {UserNotInChatException} from '@copor/vu_meet/domain/VuMeet/Core/exception/UserNotInChatException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateSendTypingStatus} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/validations/ValidateSendTypingStatus';
import {ValidateSendTypingStatusDTO} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/validations/dto/ValidateSendTypingStatusDTO';
import {ValidateSendTypingStatusRepo} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/repository/ValidateSendTypingStatusRepo';

describe('send typing status validator tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const mockStorageRepo: jest.Mocked<ValidateSendTypingStatusRepo> = {
		isInvalidChat: jest.fn(),
		isUserNotInChat: jest.fn()
	};
	const input: ValidateSendTypingStatusDTO = {
		actorId: 'aid',
		chatId: 'cid'
	};
	let validator: ValidateSendTypingStatus;

	beforeEach(() => {
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidChat.mockResolvedValue(false);
		mockStorageRepo.isUserNotInChat.mockResolvedValue(false);
	});
	it('should throw error if user does not have permission', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateSendTypingStatus(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if chat is invalid', async () => {
		const errorList = new ErrorList([new InvalidChatException()]);

		mockStorageRepo.isInvalidChat.mockResolvedValue(true);
		validator = new ValidateSendTypingStatus(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if user is not in chat', async () => {
		const errorList = new ErrorList([new UserNotInChatException()]);

		mockStorageRepo.isUserNotInChat.mockResolvedValue(true);
		validator = new ValidateSendTypingStatus(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
