import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateCreatePublicTag} from '@copor/core/domain/Components/Tag/validation/ValidateCreatePublicTag';
import {SaveTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/SaveTagDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {EmptyNameException} from '@copor/core/domain/Core/Exceptions/empty/EmptyNameException';
import {Color} from '@copor/core/domain/Core/enum/Color';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';

describe('Validate create public tag tests', () => {
	let permissionRepo: jest.Mocked<PermissionRepository>;
	let validator: ValidateCreatePublicTag;
	let input: SaveTagDTO;

	beforeEach(() => {
		permissionRepo = {
			isAllowed: jest.fn()
		};
		input = {
			colorSet: ColorSet.SET9,
			description: 'description',
			id: 'uniqueId',
			name: 'name',
			actorId: 'unique-id',
			color: Color.cyan,
			isPrivate: false
		};
	});
	it('Should throw error if user is not allowed to create public tag', async() => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		permissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateCreatePublicTag(input, permissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if name is empty', async() => {
		const errorList = new ErrorList([new EmptyNameException()]);

		permissionRepo.isAllowed.mockResolvedValue(true);
		input.name = '';
		validator = new ValidateCreatePublicTag(input, permissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
