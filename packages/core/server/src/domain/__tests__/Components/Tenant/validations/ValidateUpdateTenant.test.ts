import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {SaveTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/SaveTenantDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {EmptyNameException} from '@copor/core/domain/Core/Exceptions/empty/EmptyNameException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {EmptyAddressException} from '@copor/core/domain/Core/global/ContactDetails/exceptions/EmptyAddressException';
import {InvalidTenantException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidTenantException';
import {ValidateUpdateTenant} from '@copor/core/domain/Components/Tenant/validations/ValidateUpdateTenant';
import {ValidateUpdateTenantRepo} from '@copor/core/domain/Components/Tenant/repository/ValidateUpdateTenantRepo';
import {InvalidRegionCityException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidRegionCityException';


describe('validate update tenant tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdateTenantRepo>;
	let validator: ValidateUpdateTenant;
	let input: SaveTenantDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidTenant: jest.fn(),
			isInvalidRegionCity: jest.fn(),
			isNotValidUser: jest.fn()
		};
		input = {
			id: 'tenant-001',
			name: 'Test Tenant Berlin',
			isBaseTenant: true,
			addressStreet: 'Hauptstraße 12',
			city: 'Berlin',
			regionCityId: 'region-city-berlin-001',
			publishStatus: PublishStatus.published,
			email: 'info@testtenant.de',
			phone: '+49 30 12345678',
			contractSignedBy: 'Anna Schmidt',
			contactName: 'Markus Weber',
			contactDepartment: 'Administration',
			contactAddressStreet: 'Nebenstraße 5',
			contactPostalCode: '10115',
			contactCity: 'Berlin',
			contactPhone: '+49 30 87654321',
			contactEmail: 'contact@testtenant.de',
			actorId: 'actor-001',
			latitude: 52.5200,
			longitude: 13.4050
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidTenant.mockResolvedValue(false);
		mockStorageRepo.isInvalidRegionCity.mockResolvedValue(false);
		mockStorageRepo.isNotValidUser.mockResolvedValue(false);
	});

	it('should throw error if user is not authorized to update tenant', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		validator = new ValidateUpdateTenant(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if name is empty', async () => {
		const errorList = new ErrorList([new EmptyNameException()]);

		input.name = '';
		validator = new ValidateUpdateTenant(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if address is empty', async () => {
		const errorList = new ErrorList([new EmptyAddressException()]);

		input.addressStreet = '';
		validator = new ValidateUpdateTenant(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if region is invalid', async () => {
		const errorList = new ErrorList([new InvalidRegionCityException()]);

		mockStorageRepo.isInvalidRegionCity.mockResolvedValue(true);
		validator = new ValidateUpdateTenant(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if tenant id is invalid', async () => {
		const errorList = new ErrorList([new InvalidTenantException()]);

		mockStorageRepo.isInvalidTenant.mockResolvedValue(true);
		validator = new ValidateUpdateTenant(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
