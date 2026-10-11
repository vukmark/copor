import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {InvalidChatMemberCountException} from '@copor/vu_meet/domain/VuMeet/Core/exception/InvalidChatMemberCountException';

const MIN_CHAT_MEMBER_COUNT = 2;

export class ValidateChatMemberCount implements Validator {
	private readonly memberCount: number;

	constructor(memberCount: number) {
		this.memberCount = memberCount;
	}

	async validate(): Promise<void> {
		if (this.memberCount < MIN_CHAT_MEMBER_COUNT)
			throw new InvalidChatMemberCountException();
	}
}
