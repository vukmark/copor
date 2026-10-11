import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateUpdateChat} from '@copor/vu_meet/domain/VuMeet/Chat/validations/ValidateUpdateChat';
import {
	ValidateUpdateChatDTO
} from '@copor/vu_meet/domain/VuMeet/Chat/validations/dto/ValidateUpdateChatDTO';
import {ValidateUpdateChatRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateUpdateChatRepo';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {EmptyGroupChatNameException} from '@copor/vu_meet/domain/VuMeet/Core/exception/EmptyGroupChatNameException';
import {UserNotInChatException} from '@copor/vu_meet/domain/VuMeet/Core/exception/UserNotInChatException';
import {InvalidChatMemberCountException} from '@copor/vu_meet/domain/VuMeet/Core/exception/InvalidChatMemberCountException';
import {DuplicateChatMemberException} from '@copor/vu_meet/domain/VuMeet/Core/exception/DuplicateChatMemberException';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';
import {VuMeetPermission} from '@copor/vu_meet/domain/VuMeet/VuMeetPermission';

describe('Validate update Chat tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdateChatRepo>;
	let validator: ValidateUpdateChat;
	let input: ValidateUpdateChatDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidChat: jest.fn(),
			isUserNotInChat: jest.fn(),
			isUserNotVisible: jest.fn()
		};
		input = {
			id: 'chatId',
			actorId: 'actorId',
			userList: ['other'],
			name: ''
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidChat.mockResolvedValue(false);
		mockStorageRepo.isUserNotInChat.mockResolvedValue(false);
		mockStorageRepo.isUserNotVisible.mockResolvedValue(false);
	});

	it('Should throw error if user is not authorized to update Chat', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdateChat(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if updating to a group chat (3+ users) with an empty name', async () => {
		const errorList = new ErrorList([new EmptyGroupChatNameException()]);

		input = {id: 'chatId', actorId: 'actorId', userList: ['other1', 'other2'], name: ''};
		validator = new ValidateUpdateChat(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should not throw for an empty name when the chat stays private (fewer than 3 users)', async () => {
		validator = new ValidateUpdateChat(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toBeUndefined();
	});

	it('Should throw error if the actor is not a member of the chat being updated', async () => {
		const errorList = new ErrorList([new UserNotInChatException()]);

		mockStorageRepo.isUserNotInChat.mockImplementation((userId) => Promise.resolve(userId === 'actorId'));
		validator = new ValidateUpdateChat(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if the update would leave the chat with fewer than 2 members (userList emptied)', async () => {
		const errorList = new ErrorList([new InvalidChatMemberCountException()]);

		input = {id: 'chatId', actorId: 'actorId', userList: [], name: ''};
		validator = new ValidateUpdateChat(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if the userList contains a duplicate id', async () => {
		const errorList = new ErrorList([new DuplicateChatMemberException()]);

		input = {id: 'chatId', actorId: 'actorId', userList: ['other', 'other'], name: 'Group'};
		validator = new ValidateUpdateChat(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if the userList already contains the actor', async () => {
		const errorList = new ErrorList([new DuplicateChatMemberException()]);

		input = {id: 'chatId', actorId: 'actorId', userList: ['actorId'], name: ''};
		validator = new ValidateUpdateChat(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should not check members already in the chat against the actor\'s scope', async () => {
		input = {id: 'chatId', actorId: 'actorId', userList: ['existing1', 'existing2'], name: 'Group'};
		mockStorageRepo.isUserNotVisible.mockResolvedValue(true);
		validator = new ValidateUpdateChat(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toBeUndefined();
		expect(mockStorageRepo.isUserNotVisible).not.toHaveBeenCalled();
	});

	it('Should check an added member against VuMeet\'s contact list scope', async () => {
		input = {id: 'chatId', actorId: 'actorId', userList: ['existing', 'added'], name: 'Group'};
		mockStorageRepo.isUserNotInChat.mockImplementation((userId) => Promise.resolve(userId === 'added'));
		validator = new ValidateUpdateChat(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toBeUndefined();
		expect(mockStorageRepo.isUserNotVisible).toHaveBeenCalledTimes(1);
		expect(mockStorageRepo.isUserNotVisible)
			.toHaveBeenCalledWith('actorId', 'added', VuMeetPermission.canGetVuMeetContactList, true);
	});

	it('Should throw error if an added member is outside the actor\'s scope', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);

		input = {id: 'chatId', actorId: 'actorId', userList: ['existing', 'added'], name: 'Group'};
		mockStorageRepo.isUserNotInChat.mockImplementation((userId) => Promise.resolve(userId === 'added'));
		mockStorageRepo.isUserNotVisible.mockResolvedValue(true);
		validator = new ValidateUpdateChat(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
