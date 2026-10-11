import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {MessageContentType} from '@copor/vu_meet/domain/VuMeet/Core/enum/MessageContentType';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';
import {InvalidChatException} from '@copor/vu_meet/domain/VuMeet/Core/exception/InvalidChatException';
import {ValidateCreateMessage} from '@copor/vu_meet/domain/VuMeet/Message/validations/ValidateCreateMessage';
import {
	ValidateCreateMessageDTO
} from '@copor/vu_meet/domain/VuMeet/Message/validations/dto/ValidateCreateMessageDTO';
import {
	ValidateCreateMessageRepo
} from '@copor/vu_meet/domain/VuMeet/Message/repository/ValidateCreateMessageRepo';
import {UserNotInChatException} from '@copor/vu_meet/domain/VuMeet/Core/exception/UserNotInChatException';
import {InvalidFileSizeException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidFileSizeException';
import {EmptyContentException} from '@copor/core/domain/Core/Exceptions/EmptyContentException';
import {ContentTooLongException} from '@copor/core/domain/Core/Exceptions/invalid/ContentTooLongException';

describe('validate create private message tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateCreateMessageRepo>;
	let validator: ValidateCreateMessage;
	let input: ValidateCreateMessageDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidFileSize: jest.fn(),
			isNotValidUser: jest.fn(),
			isInvalidChat: jest.fn(),
			isUserNotInChat: jest.fn()
		};
		input = {
			content: 'message',
			sender: 'sender',
			type: MessageContentType.TEXT,
			actorId: 'actorId',
			chat: 'chat',
			file: Buffer.from('file', 'utf-8')
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isNotValidUser.mockResolvedValue(false);
		mockStorageRepo.isInvalidChat.mockResolvedValue(false);
		mockStorageRepo.isUserNotInChat.mockResolvedValue(false);
		mockStorageRepo.isInvalidFileSize.mockResolvedValue(false);
	});
	it('Should throw error if user is not authorized to create privateChat', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateCreateMessage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if sender is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);

		mockStorageRepo.isNotValidUser.mockResolvedValue(true);
		validator = new ValidateCreateMessage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if chat is invalid', async () => {
		const errorList = new ErrorList([new InvalidChatException()]);

		mockStorageRepo.isInvalidChat.mockResolvedValue(true);
		validator = new ValidateCreateMessage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if user is not one of the participants in the chat', async () => {
		const errorList = new ErrorList([new UserNotInChatException()]);

		mockStorageRepo.isUserNotInChat.mockResolvedValue(true);
		validator = new ValidateCreateMessage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if file is invalid size', async () => {
		const errorList = new ErrorList([new InvalidFileSizeException()]);

		mockStorageRepo.isInvalidFileSize.mockResolvedValue(true);
		validator = new ValidateCreateMessage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if content is empty', async () => {
		const errorList = new ErrorList([new EmptyContentException()]);

		input = {... input, content: '   '};
		validator = new ValidateCreateMessage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if content exceeds the max length', async () => {
		const errorList = new ErrorList([new ContentTooLongException()]);

		input = {... input, content: 'a'.repeat(5001)};
		validator = new ValidateCreateMessage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should not throw for content at exactly the max length', async () => {
		input = {... input, content: 'a'.repeat(5000)};
		validator = new ValidateCreateMessage(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toBeUndefined();
	});
});
