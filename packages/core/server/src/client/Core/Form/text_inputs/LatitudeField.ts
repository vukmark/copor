import {DoubleField} from '@copor/core/client/Core/Form/number_inputs/DoubleField';
import {RequiredField} from '@copor/core/client/Core/Form/FormField';

export class LatitudeField extends DoubleField {

	protected getLabel(): string {
		return 'LATITUDE';
	}

	protected getName(): string {
		return 'latitude';
	}
}

export class RequiredLatitudeField extends DoubleField implements RequiredField {
	getRequiredMessage(): string {
		return 'LATITUDE_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'LATITUDE';
	}

	protected getName(): string {
		return 'latitude';
	}
}