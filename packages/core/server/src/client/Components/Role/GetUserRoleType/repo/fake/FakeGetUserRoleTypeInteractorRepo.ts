import {GetUserRoleTypeRepo} from '@copor/core/domain/Components/Role/interactor/GetUserRoleType';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export class FakeGetUserRoleTypeInteractorRepo implements GetUserRoleTypeRepo {
	public load(userId: string): Promise<RoleType> {
		return Promise.resolve(RoleType.USER);
	}
}
