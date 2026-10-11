import {Email} from '@copor/core/domain/Core/global/Email/Email';

export abstract class BaseEmail<InputDTO> implements Email {
	protected input: InputDTO;
	constructor(input: InputDTO) {
		this.input = input;
	}

	abstract getReceiver(): string;
	abstract getSubject(): string;
	abstract getContent(): string;
}
