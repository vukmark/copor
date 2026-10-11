import {SearchTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/SearchTagDTO';
import {SearchTagRepo} from '@copor/core/domain/Components/Tag/repository/SearchTagRepo';
import {db} from '@copor/core/client/AppDataSource';

export class KyselySearchTagListInteractorRepo implements SearchTagRepo {
	async search(input: string, actorId: string): Promise<SearchTagDTO[]> {
		let results = db
			.selectFrom('tag')
			.select(['id', 'name', 'color', 'description', 'isPrivate']);

		if (input) {
			results = results.where('name', 'like', `%${input}%`);
		}
		results = results.where((eb) => eb.or([
			eb('isPrivate', '=', false),
			eb('isPrivate', 'is', null),
			eb.and([
				eb('isPrivate', '=', true),
				eb('actorId', '=', actorId)
			])
		])
		);

		const tags = await results.execute();

		const resultTags: SearchTagDTO[] = tags.map((tag) => ({
			id: tag.id,
			name: tag.name,
			description: tag.description ?? undefined,
			color: tag.color
		}));

		return resultTags;
	}
}
