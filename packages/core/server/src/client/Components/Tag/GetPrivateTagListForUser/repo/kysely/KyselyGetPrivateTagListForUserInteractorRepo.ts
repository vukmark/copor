import {GetPrivateTagListForUserRepo} from '@copor/core/domain/Components/Tag/repository/GetPrivateTagListForUserRepo';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyGetPrivateTagListForUserInteractorRepo implements GetPrivateTagListForUserRepo {
	async load(userId: string, searchPrompt: string): Promise<GetTagDTO[]> {
		const tags = await db
			.selectFrom('tag')
			.select(['id', 'name', 'color','colorSet', 'description', 'isPrivate'])
			.where('isPrivate', '=', true)
			.where('actorId', '=', userId)
			.where('name', 'like', `%${searchPrompt}%`)
			.orderBy('name', 'asc')
			.execute();


		return tags.map((tag) => ({
			id: tag.id,
			name: tag.name,
			color: tag.color,
			colorSet: tag.colorSet,
			description: tag.description ?? undefined,
			isPrivate: Boolean(tag.isPrivate)
		}));
	}
}
