import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateUpdateRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/ValidateUpdateRegionCityRepo';
import {SaveRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/SaveRegionCityDTO';
import {ValidateUpdateRegionCity} from '@copor/core/domain/Components/RegionCity/validations/ValidateUpdateRegionCity';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {EmptyNameException} from '@copor/core/domain/Core/Exceptions/empty/EmptyNameException';
import {EmptyCityException} from '@copor/core/domain/Core/Exceptions/empty/EmptyCityException';
import {EmptyCodeException} from '@copor/core/domain/Core/Exceptions/empty/EmptyCodeException';
import {InvalidLatitudeRangeException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidLatitudeRangeException';
import {InvalidLongitudeRangeException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidLongitudeRangeException';

describe('validate can update region', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdateRegionCityRepo>;
	let input: SaveRegionCityDTO;
	let validator: ValidateUpdateRegionCity;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidRegionCity: jest.fn(),
			isInvalidRegion: jest.fn()
		};

		input = {
			id: 'unique-id',
			regionId: 'regionId',
			city: 'city',
			province: 'province',
			provinceCode: 'provinceCode',
			community: 'community',
			communityCode: 'communityCode',
			latitude: 51.30260,
			longitude: 51.30260,
			actorId: 'actorId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidRegionCity.mockResolvedValue(false);
		mockStorageRepo.isInvalidRegion.mockResolvedValue(false);
	});

	it('Should throw error if user is not allowed to create region-city', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdateRegionCity(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if city is empty', async () => {
		const errorList = new ErrorList([new EmptyCityException()]);

		input.city = '';
		validator = new ValidateUpdateRegionCity(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if province is empty', async () => {
		const errorList = new ErrorList([new EmptyNameException()]);

		input.province = '';
		validator = new ValidateUpdateRegionCity(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if provinceCode is empty', async () => {
		const errorList = new ErrorList([new EmptyCodeException()]);

		input.provinceCode = '';
		validator = new ValidateUpdateRegionCity(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if community is empty', async () => {
		const errorList = new ErrorList([new EmptyNameException()]);

		input.community = '';
		validator = new ValidateUpdateRegionCity(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if communityCode is empty', async () => {
		const errorList = new ErrorList([new EmptyCodeException()]);

		input.communityCode = '';
		validator = new ValidateUpdateRegionCity(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if latitude is invalid', async () => {
		const errorList = new ErrorList([new InvalidLatitudeRangeException()]);

		input.latitude = -90.01;
		validator = new ValidateUpdateRegionCity(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if longitude is invalid', async () => {
		const errorList = new ErrorList([new InvalidLongitudeRangeException()]);

		input.longitude = -180.01;
		validator = new ValidateUpdateRegionCity(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});