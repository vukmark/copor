import {SendTypingStatusDTO} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/interactor/dto/SendTypingStatusDTO';
import {SendTypingStatusRepo} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/repository/SendTypingStatusRepo';
import {db} from '@copor/core/client/AppDataSource';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';
import {TypingStatusMessageDTO} from '@copor/vu_meet/client/VuMeet/Core/WebSocket/dto/TypingStatusMessageDTO';
import {VuMeetWebSocket} from '@copor/vu_meet/client/VuMeet/Core/WebSocket/VuMeetWebSocket';

export class KyselySendChatTypingStatusRepo implements SendTypingStatusRepo {
	async send(input: SendTypingStatusDTO): Promise<void> {
		const members = await db
			.selectFrom('chatUserMap')
			.select('userId')
			.where('chatId', '=', input.chatId)
			.execute();
		const userData = await UserKyselyHelper.findUser(input.userId);

		for (const member of members) {
			if (member.userId != input.userId) {
				const data: TypingStatusMessageDTO = {
					userId: input.userId,
					chatId: input.chatId,
					typingStatus: input.status,
					userName: userData.username
				};

				VuMeetWebSocket.sendTypingStatusMessage([member.userId], data);
			}
		}
		return Promise.resolve();
	}
}
