import {FormField} from '@copor/core/client/Core/Form/FormField';
import {GetUserAccountInformationDTO} from '@copor/core/domain/User/interactor/dto/GetUserAccountInformationDTO';
import {FirstNameField} from '@copor/core/client/Core/Form/text_inputs/FirstNameField';
import {LastNameField} from '@copor/core/client/Core/Form/text_inputs/LastNameField';
import {GeneralEmailField} from '@copor/core/client/Core/Form/text_inputs/GeneralEmailField';
import {PhoneNumberListField} from '@copor/core/client/AccountInformation/GetUserAccountInformationForm/fields/PhoneNumberListField';
import {AccountFormPresenter} from '@copor/core/client/Core/Form/AccountFormPresenter';
import {AccountFormVariant} from '@copor/core/client/Core/Form/AccountFormVariant';

export interface GenericAccountInformationFormPresenterDTO {
	accountInformation: GetUserAccountInformationDTO;
}

export class GenericAccountInformationFormPresenter
	extends AccountFormPresenter<GenericAccountInformationFormPresenterDTO> {
	public getVariant(): AccountFormVariant {
		return AccountFormVariant.PERSONAL;
	}

	protected getEndpoint(): string {
		return '/user/account-information';
	}

	protected getFormFields(): FormField[] {
		const info = this.input.accountInformation;

		return [
			new FirstNameField(info.firstName),
			new LastNameField(info.lastName),
			new GeneralEmailField(info.email ?? ''),
			new PhoneNumberListField(info.phoneNumberList ?? [])
		];
	}
}
