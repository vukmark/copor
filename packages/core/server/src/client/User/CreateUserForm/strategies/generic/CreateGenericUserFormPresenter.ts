import {FormPresenter} from '@copor/core/client/Core/Form/FormPresenter';
import {FormField} from '@copor/core/client/Core/Form/FormField';
import {FirstNameField} from '@copor/core/client/Core/Form/text_inputs/FirstNameField';
import {LastNameField} from '@copor/core/client/Core/Form/text_inputs/LastNameField';
import {GeneralEmailField} from '@copor/core/client/Core/Form/text_inputs/GeneralEmailField';
import {GeneralPasswordField} from '@copor/core/client/Core/Form/text_inputs/GeneralPasswordField';
import {HiddenText} from '@copor/core/client/Core/Form/text_inputs/HiddenText';
import {
	PhoneNumberListField
} from '@copor/core/client/AccountInformation/GetUserAccountInformationForm/fields/PhoneNumberListField';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export interface CreateGenericUserFormPresenterDTO {
	roleType: RoleType;
}

export class CreateGenericUserFormPresenter extends FormPresenter<CreateGenericUserFormPresenterDTO> {
	protected getEndpoint(): string {
		return '/user';
	}

	protected getFormFields(): FormField[] {
		return [
			new HiddenText(this.input.roleType, 'ROLE_TYPE', 'roleType'),
			new FirstNameField(''),
			new LastNameField(''),
			new GeneralEmailField(''),
			new GeneralPasswordField(''),
			new PhoneNumberListField([])
		];
	}
}
