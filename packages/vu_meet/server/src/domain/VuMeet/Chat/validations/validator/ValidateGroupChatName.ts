import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {EmptyGroupChatNameException} from '@copor/vu_meet/domain/VuMeet/Core/exception/EmptyGroupChatNameException';

const MIN_GROUP_CHAT_MEMBER_COUNT = 3;

export class ValidateGroupChatName implements Validator {
	private readonly userCount: number;
	private readonly groupName: string;

	constructor(userCount: number, groupName: string) {
		this.userCount = userCount;
		this.groupName = groupName;
	}

	async validate(): Promise<void> {
		if (this.userCount >= MIN_GROUP_CHAT_MEMBER_COUNT && !this.groupName?.trim())
			throw new EmptyGroupChatNameException();
	}
}
