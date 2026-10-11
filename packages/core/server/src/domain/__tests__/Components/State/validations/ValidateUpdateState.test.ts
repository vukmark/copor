import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateUpdateStateRepo} from '@copor/core/domain/Components/State/repository/ValidateUpdateStateRepo';
import {ValidateUpdateState} from '@copor/core/domain/Components/State/validations/ValidateUpdateState';
import {SaveStateDTO} from '@copor/core/domain/Components/State/interactor/dto/SaveStateDTO';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {EmptyNameException} from '@copor/core/domain/Core/Exceptions/empty/EmptyNameException';
import {EmptyCodeException} from '@copor/core/domain/Core/Exceptions/empty/EmptyCodeException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {InvalidStateException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidStateException';
import {InvalidCountryException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidCountryException';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('Validate update state tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdateStateRepo>;
	let validator: ValidateUpdateState;
	let input: SaveStateDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidCountry: jest.fn(),
			isInvalidState: jest.fn()
		};
		input = {
			id: 'sId',
			name: 'Bayern',
			code: 'BY',
			actorId: 'actorId',
			countryId: 'cId',
			publishStatus: PublishStatus.published
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidState.mockResolvedValue(false);
		mockStorageRepo.isInvalidCountry.mockResolvedValue(false);
	});

	it('Should throw error if user is not allowed to update state', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdateState(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if state name is empty', async () => {
		const errorList = new ErrorList([new EmptyNameException()]);

		input.name = '';
		validator = new ValidateUpdateState(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if state code is empty', async () => {
		const errorList = new ErrorList([new EmptyCodeException()]);

		input.code = '';
		validator = new ValidateUpdateState(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if state is invalid', async () => {
		const errorList = new ErrorList([new InvalidStateException()]);

		mockStorageRepo.isInvalidState.mockResolvedValue(true);
		validator = new ValidateUpdateState(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if country is invalid', async () => {
		const errorList = new ErrorList([new InvalidCountryException()]);

		mockStorageRepo.isInvalidCountry.mockResolvedValue(true);
		validator = new ValidateUpdateState(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});