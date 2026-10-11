import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateUpdatePersonalData} from '@copor/core/domain/MyAccount/validations/ValidateUpdatePersonalData';
import {ValidateUpdatePersonalDataRepo} from '@copor/core/domain/MyAccount/repository/ValidateUpdatePersonalDataRepo';
import {SavePersonalDataDTO} from '@copor/core/domain/MyAccount/interactor/dto/SavePersonalDataDTO';
import {InvalidRoleException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidRoleException';
import {Gender} from '@copor/core/domain/Core/enum/Gender';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';

import {InvalidLastNameException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidLastNameException';
import {InvalidFirstNameException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidFirstNameException';

describe('Validate update personal data tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdatePersonalDataRepo>;
	let validator: ValidateUpdatePersonalData;
	let input: SavePersonalDataDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isNotValidUser: jest.fn(),
			isInvalidRole: jest.fn()
		};
		input = {
			id: 'some-id',
			firstName: 'firstName',
			lastName: 'lastName',
			password: 'password',
			actorId: 'actor-id',
			userRole: 'role-id',
			placeOfBirth: 'placeOfBirth',
			gender: Gender.FEMALE,
			nativeLanguage: 'Deutsch'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isNotValidUser.mockResolvedValue(false);
		mockStorageRepo.isInvalidRole.mockResolvedValue(false);
	});

	it('Should throw error if user is not allowed to update personal data', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdatePersonalData(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if user first name is empty', async () => {
		const errorList = new ErrorList([new InvalidFirstNameException()]);

		input.firstName = '';
		validator = new ValidateUpdatePersonalData(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if user last name is empty', async () => {
		const errorList = new ErrorList([new InvalidLastNameException()]);

		input.lastName = '';
		validator = new ValidateUpdatePersonalData(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if user is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);

		mockStorageRepo.isNotValidUser.mockResolvedValue(true);
		validator = new ValidateUpdatePersonalData(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if role is invalid', async () => {
		const errorList = new ErrorList([new InvalidRoleException()]);

		mockStorageRepo.isInvalidRole.mockResolvedValue(true);
		validator = new ValidateUpdatePersonalData(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});