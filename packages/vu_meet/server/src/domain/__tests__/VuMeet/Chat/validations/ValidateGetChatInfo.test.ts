import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateGetChatInfo} from '@copor/vu_meet/domain/VuMeet/Chat/validations/ValidateGetChatInfo';
import {ValidateGetChatInfoDTO} from '@copor/vu_meet/domain/VuMeet/Chat/validations/dto/ValidateGetChatInfoDTO';
import {ValidateGetChatInfoRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateGetChatInfoRepo';
import {InvalidChatException} from '@copor/vu_meet/domain/VuMeet/Core/exception/InvalidChatException';
import {UserNotInChatException} from '@copor/vu_meet/domain/VuMeet/Core/exception/UserNotInChatException';

describe('Test validate get ChatInfo', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetChatInfoRepo>;
	const input: ValidateGetChatInfoDTO = {
		actorId: 'actorID',
		chatId: 'cid'
	};

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};

		mockStorageRepo = {
			isInvalidChat: jest.fn(),
			isUserNotInChat: jest.fn()
		};

		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidChat.mockResolvedValue(false);
		mockStorageRepo.isUserNotInChat.mockResolvedValue(false);
	});

	it('Should throw error if user does not have permission', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateGetChatInfo = new ValidateGetChatInfo(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if the chat does not exist', async () => {
		const errorList = new ErrorList([new InvalidChatException()]);

		mockStorageRepo.isInvalidChat.mockResolvedValue(true);
		const validator: ValidateGetChatInfo = new ValidateGetChatInfo(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if the actor is not a member of the chat', async () => {
		const errorList = new ErrorList([new UserNotInChatException()]);

		mockStorageRepo.isUserNotInChat.mockResolvedValue(true);
		const validator: ValidateGetChatInfo = new ValidateGetChatInfo(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should not throw when permission, chat existence, and membership all pass', async () => {
		const validator: ValidateGetChatInfo = new ValidateGetChatInfo(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toBeUndefined();
	});
});