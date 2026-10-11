import {GetRoleRepo} from '@copor/core/domain/Components/Role/repository/GetRoleRepo';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {GetRole} from '@copor/core/domain/Components/Role/interactor/GetRole';

import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

describe('get role tests', () => {
	const mockGetRoleRepo: jest.Mocked<GetRoleRepo> = {
		load: jest.fn()
	};
	const uniqueId = 'role-id';
	const expectedResponse: GetRoleDTO = {
		id: 'unique-id',
		name: 'role',
		type: RoleType.USER
	};
	const getRole = new GetRole(uniqueId, mockGetRoleRepo);

	it('should return role', async () => {
		mockGetRoleRepo.load.mockResolvedValue(expectedResponse);

		expect(await getRole.execute()).toEqual(expectedResponse);
		expect(mockGetRoleRepo.load).toHaveBeenCalledWith(uniqueId);
	});
});