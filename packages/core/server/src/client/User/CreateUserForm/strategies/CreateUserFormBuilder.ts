import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {Container} from '@copor/core/client/Interface/Container';
import {CreateUserFormBuilderBase} from '@copor/core/client/User/CreateUserForm/strategies/CreateUserFormBuilderBase';
import {
	CreateGenericUserFormBuilder
} from '@copor/core/client/User/CreateUserForm/strategies/generic/CreateGenericUserFormBuilder';

export class CreateUserFormBuilder {
	static get(roleType: RoleType, container: Container): CreateUserFormBuilderBase {
		return new CreateGenericUserFormBuilder(roleType, container);
	}
}
