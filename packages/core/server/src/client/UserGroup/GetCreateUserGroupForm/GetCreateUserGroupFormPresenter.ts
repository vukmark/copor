import {FormField} from '@copor/core/client/Core/Form/FormField';
import {FormPresenter} from '@copor/core/client/Core/Form/FormPresenter';
import {NameField} from '@copor/core/client/Core/Form/text_inputs/NameField';
import {UserListField} from '@copor/core/client/UserGroup/GetUpdateUserGroupForm/GetUpdateUserGroupFormPresenter';

export class GetCreateUserGroupFormPresenter extends FormPresenter<void> {
	protected getEndpoint(): string {
		return '/user-group';
	}
	protected getFormFields(): FormField[] {
		return [
			new NameField(''),
			new UserListField([])
		];
	}
}