import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateCreatePrivateTag} from '@copor/core/domain/Components/Tag/validation/ValidateCreatePrivateTag';
import {SaveTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/SaveTagDTO';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {EmptyNameException} from '@copor/core/domain/Core/Exceptions/empty/EmptyNameException';
import {Color} from '@copor/core/domain/Core/enum/Color';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';

describe('validate create private tag tests', () => {
	let permissionRepo: jest.Mocked<PermissionRepository>;
	let validator: ValidateCreatePrivateTag;
	let input: SaveTagDTO;

	beforeEach(() => {
		permissionRepo = {
			isAllowed: jest.fn()
		};
		input = {
			colorSet: ColorSet.SET9,
			id: 'uniqueId',
			name: 'name',
			actorId: 'unique-id',
			color: Color.amber,
			isPrivate: true
		};
	});
	it('should throw error if user is not allowed to create private tag', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		permissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateCreatePrivateTag(input, permissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if name is empty', async() => {
		const errorList = new ErrorList([new EmptyNameException()]);

		permissionRepo.isAllowed.mockResolvedValue(true);
		input.name = '';
		validator = new ValidateCreatePrivateTag(input, permissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
