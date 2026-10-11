import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export class FakeGetRoleInteractorRepo implements GetItem<GetRoleDTO> {
	load(id: string): Promise<GetRoleDTO> {
		return new Promise((resolve) => {
			resolve(
				{
					id: 'someId',
					type: RoleType.USER,
					name: 'some name'
				}
			);
		});
	}
}
