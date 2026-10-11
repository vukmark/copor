import {CheckRolePermissionDependencies} from '@copor/core/domain/Components/Permission/interactor/CheckRolePermissionDependencies';
import {GetRolePermissionListRepo} from '@copor/core/domain/Components/Permission/repository/GetRolePermissionListRepo';
import {CheckRolePermissionDependenciesDTO} from '@copor/core/domain/Components/Permission/interactor/dto/CheckRolePermissionDependenciesDTO';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';

const A = CorePermission.canViewAdministrationUserFeature;
const B = CorePermission.canGetUserList;

function allow(permissionType: PermissionType): ScopedPermission {
	return {permissionType, scope: PermissionScope.ALL, effect: PermissionEffect.ALLOW};
}

describe('CheckRolePermissionDependencies', () => {
	const mockRepo: jest.Mocked<GetRolePermissionListRepo> = {
		list: jest.fn()
	};

	it('returns valid when the desired permission list is dependency-consistent', async () => {
		mockRepo.list.mockResolvedValue([allow(A), allow(B)]);

		const input: CheckRolePermissionDependenciesDTO = {
			roleId: 'role-1',
			actorId: 'actor-1',
			desiredPermissionList: [allow(A), allow(B)]
		};
		const useCase = new CheckRolePermissionDependencies(input, mockRepo);

		const result = await useCase.execute();

		expect(result.valid).toBe(true);
		expect(result.issues).toEqual([]);
	});

	it('flags a missing dependency introduced by the desired change', async () => {
		mockRepo.list.mockResolvedValue([]);

		const input: CheckRolePermissionDependenciesDTO = {
			roleId: 'role-1',
			actorId: 'actor-1',
			desiredPermissionList: [allow(B)]
		};
		const useCase = new CheckRolePermissionDependencies(input, mockRepo);

		const result = await useCase.execute();

		expect(result.valid).toBe(false);
		expect(result.issues).toEqual([
			{type: 'missing_dependency', permission: B, missing: [A]}
		]);
		expect(mockRepo.list).toHaveBeenCalledWith('role-1');
	});

	it('ignores DENY entries when determining the current and desired enabled sets', async () => {
		mockRepo.list.mockResolvedValue([{permissionType: A, scope: PermissionScope.ALL, effect: PermissionEffect.DENY}]);

		const input: CheckRolePermissionDependenciesDTO = {
			roleId: 'role-1',
			actorId: 'actor-1',
			desiredPermissionList: [{permissionType: B, scope: PermissionScope.ALL, effect: PermissionEffect.DENY}]
		};
		const useCase = new CheckRolePermissionDependencies(input, mockRepo);

		const result = await useCase.execute();

		expect(result.valid).toBe(true);
		expect(result.issues).toEqual([]);
	});
});
