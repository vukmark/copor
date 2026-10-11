import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	ValidateCanCreateUserAccountInformation
} from '@copor/core/domain/User/AccountInformation/validations/validator/ValidateCanCreateUserAccountInformation';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {CreateUserFormBuilder} from '@copor/core/client/User/CreateUserForm/strategies/CreateUserFormBuilder';

interface CreateUserFormQuery {
	role: RoleType;
}

export class CreateUserFormController extends BaseController<undefined, GetFormViewModel> {
	async getResponse(): Promise<void> {
		const roleType = (this.request.query as unknown as CreateUserFormQuery).role;

		if (!Object.values(RoleType).includes(roleType)) {
			this.next(new ErrorList([new Error('Invalid role')]));
			return;
		}

		const permissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);

		try {
			await new ValidateCanCreateUserAccountInformation(permissionRepo, this.actorId, roleType).validate();
		} catch (error) {
			this.next(new ErrorList([error as Error]));
			return;
		}

		const strategy = CreateUserFormBuilder.get(roleType, this.container);
		const presenter = await strategy.buildPresenter();

		this.response.status(200);
		this.response.send(presenter.present());
	}
}
