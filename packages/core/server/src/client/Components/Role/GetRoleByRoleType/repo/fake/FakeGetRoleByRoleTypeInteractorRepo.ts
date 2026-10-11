import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {GetRoleByRoleTypeRepo}
	from '@copor/core/domain/Components/Role/interactor/GetRoleByRoleType';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';

export class FakeGetRoleByRoleTypeInteractorRepo implements GetRoleByRoleTypeRepo {
	load(input: RoleType): Promise<GetRoleDTO> {
		return Promise.resolve(
			{
				id: 'string',
				type: RoleType.ADMIN,
				name: 'string'
			}
		);
	}
}
