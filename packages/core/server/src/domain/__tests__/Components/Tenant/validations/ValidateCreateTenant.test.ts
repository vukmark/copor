import {PermissionRepository} from '../../../../Core/Validations/PermissionRepository';
import {ErrorList} from '../../../../Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '../../../../Core/Exceptions/ForbiddenAccessException';
import {InvalidUserException} from '../../../../User/exception/InvalidUserException';
import {ValidateCreateTenant} from '../../../../Components/Tenant/validations/ValidateCreateTenant';
import {ValidateCreateTenantDTO} from '../../../../Components/Tenant/validations/dto/ValidateCreateTenantDTO';
import {ValidateCreateTenantRepo} from '../../../../Components/Tenant/repository/ValidateCreateTenantRepo';
import {InvalidRegionCityException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidRegionCityException';

describe('create tenant validator tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const mockStorageRepo: jest.Mocked<ValidateCreateTenantRepo> = {
		isInvalidRegionCity: jest.fn(),
		isNotValidUser: jest.fn()
	};
	let input: ValidateCreateTenantDTO = {
		contractSignedBy: 'csb',
		name: 'tenant-name',
		addressStreet: 'tenant-address',
		regionCityId: 'region-city',
		actorId: 'aid'
	};
	let validator: ValidateCreateTenant;

	beforeEach(() => {
		mockStorageRepo.isNotValidUser.mockResolvedValue(false);
		mockStorageRepo.isInvalidRegionCity.mockResolvedValue(false);
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});

	it('Should throw error if user is not authorized to create activityType', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateCreateTenant(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if region is invalid', async () => {
		const errorList = new ErrorList([new InvalidRegionCityException()]);

		mockStorageRepo.isInvalidRegionCity.mockResolvedValue(true);
		validator = new ValidateCreateTenant(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if contractSignedBy is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);

		input = {
			contractSignedBy: 'sur',
			regionCityId: 'region-city-id',
			name: 'name',
			addressStreet: 'sch-address',
			actorId: 'aid'
		};
		mockStorageRepo.isNotValidUser.mockResolvedValue(true);
		validator = new ValidateCreateTenant(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
