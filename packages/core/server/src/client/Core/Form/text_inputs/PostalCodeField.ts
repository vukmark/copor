import {TextField} from '@copor/core/client/Core/Form/text_inputs/TextField';
import {RequiredField} from '@copor/core/client/Core/Form/FormField';

export class PostalCodeField extends TextField implements RequiredField {
	getRequiredMessage(): string {
		return 'POSTAL_CODE_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'POSTAL_CODE';
	}

	protected getName(): string {
		return 'postalCode';
	}
}


export class OptionalPostalCodeField extends TextField {
	protected getLabel(): string {
		return 'POSTAL_CODE';
	}

	protected getName(): string {
		return 'postalCode';
	}
}