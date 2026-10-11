import {vuMeetMaxFileSizeMb} from '@copor/vu_meet/client/VuMeet/VuMeetConfig';
import {ValidateCreateMessageRepo}
	from '@copor/vu_meet/domain/VuMeet/Message/repository/ValidateCreateMessageRepo';
import {ChatKyselyHelper} from '@copor/vu_meet/client/VuMeet/Chat/helper/ChatKyselyHelper';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';
import {AppContext} from '@copor/core/client/Interface/AppContext';


export class KyselyCreateMessageValidatorStorageRepo implements ValidateCreateMessageRepo {
	private appContext: AppContext;
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}
	isInvalidFileSize(file: Buffer | undefined): Promise<boolean> {
		if (!file)
			return Promise.resolve(true);
		const maxFileSize = vuMeetMaxFileSizeMb(this.appContext);
		const maxFileSizeBytes = maxFileSize * 1024 * 1024;

		if (file.length <= maxFileSizeBytes)
			return Promise.resolve(false);
		return Promise.resolve(true);
	}
	isUserNotInChat(userId: string | undefined, chatId: string | undefined): Promise<boolean> {
		return ChatKyselyHelper.isUserNotInChat(userId, chatId);
	}
	isInvalidChat(id: string | undefined): Promise<boolean> {
		return ChatKyselyHelper.isInvalidChat(id);
	}
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return UserKyselyHelper.isNotValidUser(userId);
	}
}
