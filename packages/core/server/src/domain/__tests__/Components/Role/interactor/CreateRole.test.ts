import {CreateRole} from '@copor/core/domain/Components/Role/interactor/CreateRole';
import {SaveRoleRepo} from '@copor/core/domain/Components/Role/repository/SaveRoleRepo';
import {SaveRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/SaveRoleDTO';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

describe('test create role interactor', () => {
	let createRole: CreateRole;
	let mockSaveRoleRepo: jest.Mocked<SaveRoleRepo>;
	let inputDto: SaveRoleDTO;

	beforeEach(() => {
		mockSaveRoleRepo = {
			save: jest.fn()
		};
		inputDto = {
			id: 'unique-id',
			name: 'name',
			type: RoleType.USER,
			actorId: 'user-id'
		};
		createRole = new CreateRole(inputDto, mockSaveRoleRepo);
	});

	it('should save role', async () => {
		const saveDTO: SaveRoleDTO = {
			... inputDto,
			id: 'unique-id'
		};

		const result = await createRole.execute();

		expect(result).toEqual('unique-id');
		expect(mockSaveRoleRepo.save).toHaveBeenCalledWith(saveDTO);
	});
});
