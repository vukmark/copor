import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {EmptyGroupChatNameException} from '@copor/vu_meet/domain/VuMeet/Core/exception/EmptyGroupChatNameException';
import {InvalidChatMemberCountException} from '@copor/vu_meet/domain/VuMeet/Core/exception/InvalidChatMemberCountException';
import {DuplicateChatMemberException} from '@copor/vu_meet/domain/VuMeet/Core/exception/DuplicateChatMemberException';
import {
	ValidateGetChatWithUserDTO
} from '@copor/vu_meet/domain/VuMeet/Chat/validations/dto/ValidateGetChatWithUserDTO';
import {
	ValidateGetChatWithUser
} from '@copor/vu_meet/domain/VuMeet/Chat/validations/ValidateGetChatWithUser';
import {ValidateGetChatWithUserRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateGetChatWithUserRepo';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';
import {VuMeetPermission} from '@copor/vu_meet/domain/VuMeet/VuMeetPermission';

describe('validate get private chat with user tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const mockStorageRepo: jest.Mocked<ValidateGetChatWithUserRepo> = {
		isUserNotVisible: jest.fn()
	};
	const input: ValidateGetChatWithUserDTO = {
		actorId: 'uid',
		users: ['other'],
		groupName: ''
	};

	beforeEach(() => {
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isUserNotVisible.mockReset();
		mockStorageRepo.isUserNotVisible.mockResolvedValue(false);
	});

	it('should throw error if user is not allowed to get group chat', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateGetChatWithUser = new ValidateGetChatWithUser(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if creating a group chat (3+ users) with an empty name', async () => {
		const errorList = new ErrorList([new EmptyGroupChatNameException()]);
		const groupInput: ValidateGetChatWithUserDTO = {actorId: 'uid', users: ['other1', 'other2'], groupName: '  '};
		const validator: ValidateGetChatWithUser = new ValidateGetChatWithUser(groupInput, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should not throw for an empty name when the chat is private (fewer than 3 users)', async () => {
		const validator: ValidateGetChatWithUser = new ValidateGetChatWithUser(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toBeUndefined();
	});

	it('should throw error if the requested chat would have fewer than 2 members (empty users list)', async () => {
		const errorList = new ErrorList([new InvalidChatMemberCountException()]);
		const emptyInput: ValidateGetChatWithUserDTO = {actorId: 'uid', users: [], groupName: ''};
		const validator: ValidateGetChatWithUser = new ValidateGetChatWithUser(emptyInput, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if the users list contains a duplicate id', async () => {
		const errorList = new ErrorList([new DuplicateChatMemberException()]);
		const dupInput: ValidateGetChatWithUserDTO = {actorId: 'uid', users: ['other', 'other'], groupName: 'Group'};
		const validator: ValidateGetChatWithUser = new ValidateGetChatWithUser(dupInput, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if the users list already contains the actor', async () => {
		const errorList = new ErrorList([new DuplicateChatMemberException()]);
		const dupInput: ValidateGetChatWithUserDTO = {actorId: 'uid', users: ['uid'], groupName: ''};
		const validator: ValidateGetChatWithUser = new ValidateGetChatWithUser(dupInput, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should check every requested member against VuMeet\'s contact list scope', async () => {
		const groupInput: ValidateGetChatWithUserDTO = {actorId: 'uid', users: ['other1', 'other2'], groupName: 'Group'};
		const validator = new ValidateGetChatWithUser(groupInput, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toBeUndefined();
		expect(mockStorageRepo.isUserNotVisible)
			.toHaveBeenCalledWith('uid', 'other1', VuMeetPermission.canGetVuMeetContactList, true);
		expect(mockStorageRepo.isUserNotVisible)
			.toHaveBeenCalledWith('uid', 'other2', VuMeetPermission.canGetVuMeetContactList, true);
	});

	it('should throw error if a requested member is outside the actor\'s scope', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);
		const groupInput: ValidateGetChatWithUserDTO = {actorId: 'uid', users: ['visible', 'hidden'], groupName: 'Group'};

		mockStorageRepo.isUserNotVisible.mockImplementation((actorId, userId) => Promise.resolve(userId === 'hidden'));
		const validator = new ValidateGetChatWithUser(groupInput, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
