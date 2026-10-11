import {db} from '@copor/core/client/AppDataSource';
import {GetPrivateTagListForUserRepo} from '@copor/core/domain/Components/Tag/repository/GetPrivateTagListForUserRepo';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';

export class KyselyGetAllTagsForUserInteractorRepo implements GetPrivateTagListForUserRepo {
	async load(userId: string, searchPrompt: string): Promise<GetTagDTO []> {
		const tags = await db
			.selectFrom('tag')
			.select(['id', 'name', 'color', 'colorSet', 'description', 'isPrivate'])
			.where((eb) => eb.and([
				eb.or([
					eb('isPrivate', '=', false),
					eb('isPrivate', 'is', null),
					eb.and([
						eb('isPrivate', '=', true),
						eb('actorId', '=', userId)
					])
				]),
				eb('name', 'like', `%${searchPrompt}%`)
			])
			)
			.orderBy('isPrivate', 'desc')
			.execute();

		return tags.map((tag) => ({
			id: tag.id,
			name: tag.name,
			description: tag.description ?? undefined,
			color: tag.color,
			colorSet: tag.colorSet,
			isPrivate: Boolean(tag.isPrivate)
		}));
	}
}
