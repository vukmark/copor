import {HiddenTextField} from '@copor/core/client/Core/Form/text_inputs/HiddenTextField';

export class HiddenText extends HiddenTextField {
	constructor(currentValue: string, label: string, name: string) {
		super(currentValue, label, name);
	}
}
