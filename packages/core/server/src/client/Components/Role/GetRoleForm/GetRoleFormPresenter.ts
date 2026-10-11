import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {FormPresenter} from '@copor/core/client/Core/Form/FormPresenter';
import {FormField} from '@copor/core/client/Core/Form/FormField';
import {NameField} from '@copor/core/client/Core/Form/text_inputs/NameField';
import {RoleTypeField} from '@copor/core/client/Core/Form/drop_down/RoleTypeField';
import i18next from 'i18next';
import {RoleTypeDTOHelper} from '@copor/core/client/Components/Role/Helper/RoleTypeDTOHelper';

export class GetRoleFormPresenter
	extends FormPresenter<GetRoleDTO> {
	protected getEndpoint(): string {
		return '/role';
	}

	protected getFormFields(): FormField[] {
		i18next.setDefaultNamespace('role');
		return [
			new NameField(i18next.t(this.input?.name) ?? ''),
			new RoleTypeField({id: this.input?.type, name: i18next.t(this.input?.name)},
				RoleTypeDTOHelper.toNameAndIdDTO())
		];
	}
}


