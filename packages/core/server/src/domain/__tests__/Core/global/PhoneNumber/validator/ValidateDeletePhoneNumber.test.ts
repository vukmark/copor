import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateDeletePhoneNumberRepo} from '@copor/core/domain/Core/global/PhoneNumber/repository/ValidateDeletePhoneNumberRepo';
import {ValidateDeletePhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/validations/dto/ValidateDeletePhoneNumberDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateDeletePhoneNumber} from '@copor/core/domain/Core/global/PhoneNumber/validations/ValidateDeletePhoneNumber';
import {InvalidPhoneNumberException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidPhoneNumberException';
import {DeletionNotAllowedException} from '@copor/core/domain/Core/Exceptions/DeletionNotAllowedException';

describe('delete phone number validator test', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeletePhoneNumberRepo>;
	let inputDTO: ValidateDeletePhoneNumberDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidPhoneNumber: jest.fn(),
			entityHasReferences: jest.fn()
		};
		inputDTO = {
			id: 'phoneID',
			actorId: 'actorID'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidPhoneNumber.mockResolvedValue(false);
		mockStorageRepo.entityHasReferences.mockResolvedValue(false);
	});

	it('should throw error if user not allowed to delete a phone number', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateDeletePhoneNumber = new ValidateDeletePhoneNumber(inputDTO, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if phone number is invalid', async () => {
		const errorList = new ErrorList([new InvalidPhoneNumberException()]);

		mockStorageRepo.isInvalidPhoneNumber.mockResolvedValue(true);
		const validator: ValidateDeletePhoneNumber = new ValidateDeletePhoneNumber(inputDTO, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if phone number is referenced elsewhere', async () => {
		const errorList = new ErrorList([new DeletionNotAllowedException('x')]);

		mockStorageRepo.entityHasReferences.mockResolvedValue({tableName: 'x'});
		const validator: ValidateDeletePhoneNumber = new ValidateDeletePhoneNumber(inputDTO, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});