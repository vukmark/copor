import {SaveRoleRepo} from '@copor/core/domain/Components/Role/repository/SaveRoleRepo';
import {SaveRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/SaveRoleDTO';
import {UpdateRole} from '@copor/core/domain/Components/Role/interactor/UpdateRole';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

describe('Test Update Role', () => {
	let mockRepo: jest.Mocked<SaveRoleRepo>;
	let inputDto: SaveRoleDTO;
	let updateRole: UpdateRole;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		inputDto = {
			id: 'role-id',
			name: 'name',
			type: RoleType.USER,
			actorId: 'creator-id'
		};
		updateRole = new UpdateRole(inputDto, mockRepo);
	});

	it('should save updated data for role', async () => {
		await updateRole.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(inputDto);
	});
});
