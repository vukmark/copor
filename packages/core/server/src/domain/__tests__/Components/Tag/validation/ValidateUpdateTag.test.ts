import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidTagException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidTagException';
import {EmptyNameException} from '@copor/core/domain/Core/Exceptions/empty/EmptyNameException';
import {ValidateUpdateTagRepo} from '@copor/core/domain/Components/Tag/repository/ValidateUpdateTagRepo';
import {ValidateUpdateTag} from '@copor/core/domain/Components/Tag/validation/ValidateUpdateTag';
import {SaveTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/SaveTagDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Color} from '@copor/core/domain/Core/enum/Color';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';

describe('Validate edit tag', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdateTagRepo>;
	let validator: ValidateUpdateTag;
	let input: SaveTagDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidTag: jest.fn()
		};
		input = {
			colorSet: ColorSet.SET9,
			id: 'some-id',
			name: 'tag',
			description: 'description of tag',
			color: Color.blue,
			actorId: 'creator-id',
			isPrivate: true
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidTag.mockResolvedValue(false);
	});
	it('Should throw error if user is not allowed to create tag', async() => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdateTag(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if name is empty', async() => {
		const errorList = new ErrorList([new EmptyNameException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		input.name = '';
		validator = new ValidateUpdateTag(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if tag is invalid', async() => {
		const errorList = new ErrorList([new InvalidTagException()]);

		mockStorageRepo.isInvalidTag.mockResolvedValue(true);
		validator = new ValidateUpdateTag(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
