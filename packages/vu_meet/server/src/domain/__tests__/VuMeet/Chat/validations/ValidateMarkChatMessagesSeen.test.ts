import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidChatException} from '@copor/vu_meet/domain/VuMeet/Core/exception/InvalidChatException';
import {UserNotInChatException} from '@copor/vu_meet/domain/VuMeet/Core/exception/UserNotInChatException';
import {
	ValidateMarkChatMessagesSeen
} from '@copor/vu_meet/domain/VuMeet/Chat/validations/ValidateMarkChatMessagesSeen';
import {
	ValidateMarkChatMessagesSeenDTO
} from '@copor/vu_meet/domain/VuMeet/Chat/validations/dto/ValidateMarkChatMessagesSeenDTO';
import {
	ValidateMarkChatMessagesSeenRepo
} from '@copor/vu_meet/domain/VuMeet/Chat/validations/dto/ValidateMarkChatMessagesSeenRepo';

describe('mark private chat messages seen validator tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const mockStorageRepo: jest.Mocked<ValidateMarkChatMessagesSeenRepo> = {
		isInvalidChat: jest.fn(),
		isUserNotInChat: jest.fn()
	};
	const input: ValidateMarkChatMessagesSeenDTO = {
		userId: 'uid',
		chatId: 'cid'
	};

	beforeEach(() => {
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidChat.mockResolvedValue(false);
		mockStorageRepo.isUserNotInChat.mockResolvedValue(false);
	});
	it('should throw error if user is not allowed', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateMarkChatMessagesSeen(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if chat is invalid', async () => {
		const errorList = new ErrorList([new InvalidChatException()]);

		mockStorageRepo.isInvalidChat.mockResolvedValue(true);
		const validator = new ValidateMarkChatMessagesSeen(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if user is not in chat', async () => {
		const errorList = new ErrorList([new UserNotInChatException()]);

		mockStorageRepo.isUserNotInChat.mockResolvedValue(true);
		const validator = new ValidateMarkChatMessagesSeen(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
