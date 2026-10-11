import {GetChatInfoDTO} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/dto/GetChatInfoDTO';
import {db} from '@copor/core/client/AppDataSource';
import {RawBuilder, sql} from 'kysely';
import {GetChatInfoRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/GetChatInfoRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';

interface RawChatData {
	chatId: string;
	chatName: string;
	isPrivate: boolean;
	firstName: string | null;
	lastName: string | null;
	profilePicture: string | null;
	groupChatPicture: string | null;
	profilePictureExtension: string | null;
	otherUserIsActive: boolean | null;
}

export class KyselyGetChatInfoInteractorRepo implements GetChatInfoRepo {
	private appContext: AppContext;
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}
	async load(id: string): Promise<GetChatInfoDTO> {
		const query: RawBuilder<RawChatData> = sql`
            SELECT chat.id,
                   chat.name                as chat_name,
                   chat.is_private,
                   u.first_name             as first_name,
                   u.last_name              as last_name,
                   image.name               as profile_picture,
                   image.extension          as profile_picture_extension,
                   chat.picture             as group_chat_picture,
                   u.is_active              as other_user_is_active
            from chat as chat
                     INNER JOIN chat_user_map as tcum ON tcum.chat_id = chat.id
                     LEFT JOIN user as u on tcum.user_id = u.id
                     LEFT JOIN image ON image.id = u.profile_image_id
            WHERE chat.id = ${id}
              AND tcum.user_id != ${this.appContext.authenticationMiddleware?.getActorId()}
		`;

		const rawResult = await query.execute(db);


		if (!rawResult)
			throw new Error(`Chat with id ${id} does not exist`);
		const members = await db.selectFrom('chatUserMap as map')
			.innerJoin('user', 'user.id', 'map.userId')
			.innerJoin('role', 'user.roleId', 'role.id')
			.leftJoin('image', 'user.profileImageId', 'image.id')
			.select([
				'user.firstName as firstName',
				'user.lastName as lastName',
				'user.id as id',
				'image.name as imageName',
				'image.extension as imageExtension',
				'role.name as roleName'
			])
			.where('map.chatId', '=', id)
			.execute();

		const chatInfo = rawResult.rows[0];
		const chatPicture = chatInfo.isPrivate ? chatInfo.profilePicture : chatInfo.groupChatPicture;
		const pictureExtension = chatInfo.isPrivate ? chatInfo.profilePictureExtension : '.jpg';

		const response: GetChatInfoDTO = {
			id: id,
			name: rawResult.rows[0].chatName,
			isPrivate: rawResult.rows[0].isPrivate,
			firstName: rawResult.rows[0].firstName,
			lastName: rawResult.rows[0].lastName,
			chatPicture: chatPicture,
			chatPictureExtension: pictureExtension,
			isActive: chatInfo.isPrivate ? Boolean(chatInfo.otherUserIsActive) : undefined,
			members: members.map((member) => {
				return {
					id: member.id,
					firstName: member.firstName!,
					lastName: member.lastName!,
					picture: member.imageName,
					pictureExtension: member.imageExtension,
					roleName: member.roleName
				};
			})
		};

		return response;
	}
}
