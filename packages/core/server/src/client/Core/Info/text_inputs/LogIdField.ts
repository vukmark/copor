import {CopyableInfoTextField} from '@copor/core/client/Core/Info/text_inputs/CopyableInfoTextField';

export class LogIdField extends CopyableInfoTextField {
	protected getLabel(): string {
		return 'LOG_ID';
	}
}