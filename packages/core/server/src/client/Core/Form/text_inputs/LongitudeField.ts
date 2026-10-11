import {DoubleField} from '@copor/core/client/Core/Form/number_inputs/DoubleField';
import {RequiredField} from '@copor/core/client/Core/Form/FormField';

export class LongitudeField extends DoubleField {
	protected getLabel(): string {
		return 'LONGITUDE';
	}

	protected getName(): string {
		return 'longitude';
	}
}


export class RequiredLongitudeField extends DoubleField implements RequiredField {
	getRequiredMessage(): string {
		return 'LONGITUDE_IS_REQUIRED';
	}

	protected getLabel(): string {
		return 'LONGITUDE';
	}

	protected getName(): string {
		return 'longitude';
	}
}