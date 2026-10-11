import {PermissionRepository} from '../../../../Core/Validations/PermissionRepository';
import {ErrorList} from '../../../../Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '../../../../Core/Exceptions/ForbiddenAccessException';
import {InvalidUserException}     from '../../../../User/exception/InvalidUserException';
import {
	ValidateGetUserSpecificPermissionList
}                                 from '../../../../Components/Permission/validations/ValidateGetUserSpecificPermissionList';
import {
	ValidateGetUserSpecificPermissionListDTO
} from '../../../../Components/Permission/validations/dto/ValidateGetUserSpecificPermissionListDTO';
import {
	ValidateGetUserSpecificPermissionListRepo
} from '../../../../Components/Permission/repository/ValidateGetUserSpecificPermissionListRepo';


describe('get user permission list validator tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const mockStorageRepo: jest.Mocked<ValidateGetUserSpecificPermissionListRepo> = {
		isNotValidUser: jest.fn()
	};
	const input: ValidateGetUserSpecificPermissionListDTO = {
		actorId: 'aid',
		userId: 'rid'
	};

	beforeEach(() => {
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isNotValidUser.mockResolvedValue(false);
	});
	it('should throw error if user is not allowed to get user permission list', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateGetUserSpecificPermissionList(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if user is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);

		mockStorageRepo.isNotValidUser.mockResolvedValue(true);
		const validator = new ValidateGetUserSpecificPermissionList(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
