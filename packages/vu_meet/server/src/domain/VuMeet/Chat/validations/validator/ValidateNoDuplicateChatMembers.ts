import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {DuplicateChatMemberException} from '@copor/vu_meet/domain/VuMeet/Core/exception/DuplicateChatMemberException';

export class ValidateNoDuplicateChatMembers implements Validator {
	private readonly memberIds: string[];

	constructor(memberIds: string[]) {
		this.memberIds = memberIds;
	}

	async validate(): Promise<void> {
		if (new Set(this.memberIds).size !== this.memberIds.length)
			throw new DuplicateChatMemberException();
	}
}
