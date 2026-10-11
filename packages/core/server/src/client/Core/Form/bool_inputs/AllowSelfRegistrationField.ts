import {YesNoDropDownField} from '@copor/core/client/Core/Form/bool_inputs/YesNoDropDownField';

export class AllowSelfRegistrationField extends YesNoDropDownField {
	protected getLabel(): string {
		return 'ALLOW_SELF_REGISTRATION';
	}

	protected getName(): string {
		return 'allowSelfRegistration';
	}
}
