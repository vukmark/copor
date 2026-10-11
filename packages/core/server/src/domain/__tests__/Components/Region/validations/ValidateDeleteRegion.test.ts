import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateDeleteRegionRepo} from '@copor/core/domain/Components/Region/repository/ValidateDeleteRegionRepo';
import {ValidateDeleteRegionDTO} from '@copor/core/domain/Components/Region/validations/dto/ValidateDeleteRegionDTO';
import {ValidateDeleteRegion} from '@copor/core/domain/Components/Region/validations/ValidateDeleteRegion';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidRegionException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidRegionException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {DeletionNotAllowedException} from '@copor/core/domain/Core/Exceptions/DeletionNotAllowedException';

describe('validate delete region tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeleteRegionRepo>;
	let input: ValidateDeleteRegionDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidRegion: jest.fn(),
			entityHasReferences: jest.fn()
		};
		input = {
			actorId: 'user-id',
			regionId: 'unique-id'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidRegion.mockResolvedValue(false);
		mockStorageRepo.entityHasReferences.mockResolvedValue(false);
	});

	it('Should throw error if user does not have permission', async() => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateDeleteRegion(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if region with provided id does not exist', async () => {
		const errorList = new ErrorList([new InvalidRegionException()]);

		mockStorageRepo.isInvalidRegion.mockResolvedValue(true);
		const validator = new ValidateDeleteRegion(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if region has references', async () => {
		const errorList = new ErrorList([new DeletionNotAllowedException('x')]);

		mockStorageRepo.entityHasReferences.mockResolvedValue({tableName: 'x'});
		const validator = new ValidateDeleteRegion(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
