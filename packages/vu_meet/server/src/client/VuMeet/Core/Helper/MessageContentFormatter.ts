import {CallAction} from '@copor/vu_meet/client/VuMeet/Chat/HandleCallAction/dto/CallAction';
import {MessageContentType} from '@copor/vu_meet/domain/VuMeet/Core/enum/MessageContentType';
import i18next from 'i18next';

export class MessageContentFormatter {
	public static formatContent(input: FormatContentDTO): string {
		i18next.setDefaultNamespace('vu_meet');

		if (input.type === MessageContentType.FILE || input.type === MessageContentType.PICTURE)
			return i18next.t('translationStringList.SENT_A_FILE');

		switch (input.content as CallAction) {
			case CallAction.END_CALL :
				return i18next.t('translationStringList.CALL_ENDED');
			case CallAction.DECLINE_CALL :
				if (input.senderId == input.actorId)
					return i18next.t('translationStringList.YOU_DECLINED_CALL');
				return i18next.t('translationStringList.YOUR_CALL_DECLINED');
			case CallAction.TIMEOUT_CALL :
				if (input.senderId == input.actorId)
					return i18next.t('translationStringList.CALL_TO_YOU_TIMED_OUT');
				return i18next.t('translationStringList.YOUR_CALL_TIMED_OUT');
			case CallAction.CALL_ACCEPTED :
				if (input.senderId == input.actorId)
					return i18next.t('translationStringList.CALL_TO_YOU_ACCEPTED');
				return i18next.t('translationStringList.YOUR_CALL_ACCEPTED');
		}
		return input.content;
	}
}
export interface FormatContentDTO {
	content: string;
	senderId: string;
	actorId: string;
	// Only meaningful for distinguishing FILE/PICTURE (whose `content` is a raw filename,
	// not real message text) from everything else - omit it at call sites (like the actual
	// in-chat message list) that need the raw filename preserved, not a generic label.
	type?: MessageContentType;
}