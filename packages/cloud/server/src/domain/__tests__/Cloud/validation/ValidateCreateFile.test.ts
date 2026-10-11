import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateCreateFile} from '@copor/cloud/domain/Cloud/validation/ValidateCreateFile';
import {ValidateCreateFileDTO} from '@copor/cloud/domain/Cloud/validation/dto/ValidateCreateFileDTO';
import {ValidateCreateFileRepo} from '@copor/cloud/domain/Cloud/repository/ValidateCreateFileRepo';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {SharingType} from '@copor/cloud/domain/Cloud/interactor/dto/SaveFileDTO';
import {InvalidUserGroupException} from '@copor/core/domain/UserGroup/exception/InvalidUserGroupException';
import {UserNotInUserGroupException} from '@copor/cloud/domain/Cloud/exception/UserNotInUserGroupException';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';
import {CloudPermission} from '@copor/cloud/domain/Cloud/CloudPermission';

describe('Validate create File tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateCreateFileRepo>;
	let validator: ValidateCreateFile;
	let input: ValidateCreateFileDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidFileSize: jest.fn(),
			isInvalidUserGroup: jest.fn(),
			isUserNotInUserGroup: jest.fn(),
			isUserNotVisible: jest.fn()
		};
		input = {
			actorId: 'actorId',
			buffer: Buffer.from('test'),
			sharingType: SharingType.USER_GROUP,
			sharingParticipants: {
				userGroupId: 'id',
				userId: 'id'
			}
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isUserNotInUserGroup.mockResolvedValue(false);
		mockStorageRepo.isInvalidFileSize.mockResolvedValue(false);
		mockStorageRepo.isInvalidUserGroup.mockResolvedValue(false);
		mockStorageRepo.isUserNotVisible.mockResolvedValue(false);
	});

	it('Should throw error if user from custom group is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserGroupException()]);

		input.sharingType = SharingType.USER_GROUP;
		mockStorageRepo.isInvalidUserGroup.mockResolvedValue(true);
		validator = new ValidateCreateFile(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if user is not in user group', async () => {
		const errorList = new ErrorList([new UserNotInUserGroupException()]);

		input.sharingType = SharingType.USER_GROUP;
		input.sharingParticipants.userGroupId = 'id';

		mockStorageRepo.isUserNotInUserGroup.mockResolvedValue(true);

		validator = new ValidateCreateFile(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if the actor may not create public files', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		input.sharingType = SharingType.PUBLIC;
		input.sharingParticipants.userId = input.actorId;
		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		validator = new ValidateCreateFile(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should not check the target user when uploading to the actor\'s own Public folder', async () => {
		input.sharingType = SharingType.PUBLIC;
		input.sharingParticipants.userId = input.actorId;

		validator = new ValidateCreateFile(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toBeUndefined();
		expect(mockStorageRepo.isUserNotVisible).not.toHaveBeenCalled();
		expect(mockPermissionRepo.isAllowed).not.toHaveBeenCalledWith(input.actorId, CloudPermission.canGetShareRecipientList, undefined);
	});

	it('Should reject a target user the recipient picker could not list (unknown or outside the scope)', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);

		input.sharingType = SharingType.PUBLIC;
		input.sharingParticipants.userId = 'someone-else';
		mockStorageRepo.isUserNotVisible.mockResolvedValue(true);

		validator = new ValidateCreateFile(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
		expect(mockStorageRepo.isUserNotVisible)
			.toHaveBeenCalledWith('actorId', 'someone-else', CloudPermission.canGetShareRecipientList, true);
	});

	it('Should require cloud.canGetShareRecipientList when uploading to another user\'s Public folder', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		input.sharingType = SharingType.PUBLIC;
		input.sharingParticipants.userId = 'someone-else';
		mockPermissionRepo.isAllowed.mockImplementation((_actorId, permissionType) =>
			Promise.resolve(permissionType !== CloudPermission.canGetShareRecipientList));

		validator = new ValidateCreateFile(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should pass when uploading to another existing user\'s Public folder', async () => {
		input.sharingType = SharingType.PUBLIC;
		input.sharingParticipants.userId = 'someone-else';

		validator = new ValidateCreateFile(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toBeUndefined();
	});
});
