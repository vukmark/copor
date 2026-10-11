import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidChatException} from '@copor/vu_meet/domain/VuMeet/Core/exception/InvalidChatException';
import {UserNotInChatException} from '@copor/vu_meet/domain/VuMeet/Core/exception/UserNotInChatException';
import {
	ValidateSearchMessagesInChat
} from '@copor/vu_meet/domain/VuMeet/Message/validations/ValidateSearchMessagesInChat';
import {
	ValidateSearchMessagesInChatRepo
} from '@copor/vu_meet/domain/VuMeet/Message/repository/ValidateSearchMessagesInChatRepo';

describe('validate search messages in private chat', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const mockStorageRepo: jest.Mocked<ValidateSearchMessagesInChatRepo> = {
		isUserNotInChat: jest.fn(),
		isInvalidChat: jest.fn()
	};
	const validateSearchMessagesInChat: ValidateSearchMessagesInChat
		= new ValidateSearchMessagesInChat({chatId: 'cid', actorId: 'aId'}, mockPermissionRepo, mockStorageRepo);

	beforeEach(() => {
		mockStorageRepo.isInvalidChat.mockResolvedValue(false);
		mockStorageRepo.isUserNotInChat.mockResolvedValue(false);
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});

	it('should throw error if user is not allowed to search messages', async () => {
		const errorLIst = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const result = await validateSearchMessagesInChat.validate();

		expect(result).toStrictEqual(errorLIst);
	});
	it('should throw error if chat id is invalid', async () => {
		const errorLIst = new ErrorList([new InvalidChatException()]);

		mockStorageRepo.isInvalidChat.mockResolvedValue(true);
		const result = await validateSearchMessagesInChat.validate();

		expect(result).toStrictEqual(errorLIst);
	});
	it('should throw error if user is not in chat', async () => {
		const errorLIst = new ErrorList([new UserNotInChatException()]);

		mockStorageRepo.isUserNotInChat.mockResolvedValue(true);
		const result = await validateSearchMessagesInChat.validate();

		expect(result).toStrictEqual(errorLIst);
	});
});
