import {FormField} from '@copor/core/client/Core/Form/FormField';
import {FormPresenter} from '@copor/core/client/Core/Form/FormPresenter';
import {NameField} from '@copor/core/client/Core/Form/text_inputs/NameField';
import {SearchableMultiselect} from '@copor/core/client/Core/Form/SearchableDropdownField';
import {GetUserGroupUserListDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupUserListDTO';
import {GetUserGroupUserListDTOHelper} from '@copor/core/client/UserGroup/Helper/GetUserGroupUserListDTOHelper';
import {GetUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupDTO';

interface GetUserGroupFormPresenterDTO {
	userGroup: GetUserGroupDTO;
	userList: GetUserGroupUserListDTO[];
}

export class GetUpdateUserGroupFormPresenter extends FormPresenter<GetUserGroupFormPresenterDTO> {
	protected getEndpoint(): string {
		return '/user-group';
	}
	protected getFormFields(): FormField[] {
		const fields: FormField[] = [
			new UserListField(GetUserGroupUserListDTOHelper.toNameAndIdDTO(this.input.userList))
		];

		if (!this.input.userGroup.isSpecial)
			new NameField(this.input.userGroup.name);
		return fields;
	}
}

export class UserListField extends SearchableMultiselect {
	protected getKey(): string {
		return 'user';
	}
	protected getLabel(): string {
		return 'USER_LIST';
	}
	protected getName(): string {
		return 'userList';
	}
}