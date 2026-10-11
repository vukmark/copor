import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {RequiredField} from '@copor/core/client/Core/Form/FormField';
import {DropDownField} from '@copor/core/client/Core/Form/drop_down/DropDownField';

export class RoleTypeField extends DropDownField<RoleType> implements RequiredField {
	getRequiredMessage(): string {
		return 'ROLE_TYPE_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'ROLE_TYPE';
	}

	protected getName(): string {
		return 'type';
	}
}