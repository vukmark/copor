import {CreateUserFormBuilderBase} from '@copor/core/client/User/CreateUserForm/strategies/CreateUserFormBuilderBase';
import {
	CreateGenericUserFormPresenter
} from '@copor/core/client/User/CreateUserForm/strategies/generic/CreateGenericUserFormPresenter';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {Container} from '@copor/core/client/Interface/Container';

export class CreateGenericUserFormBuilder extends CreateUserFormBuilderBase {
	constructor(private readonly roleType: RoleType, container: Container) {
		super(container);
	}

	buildPresenter() {
		return Promise.resolve(this.container.getPresenter(CreateGenericUserFormPresenter, {
			roleType: this.roleType
		}));
	}
}
