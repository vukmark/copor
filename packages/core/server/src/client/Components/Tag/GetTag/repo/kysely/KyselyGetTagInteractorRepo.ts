import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyGetTagInteractorRepo implements GetItem<GetTagDTO> {
	async load(id: string): Promise<GetTagDTO> {
		const result = await db
			.selectFrom('tag')
			.select(['id', 'description', 'color', 'colorSet', 'name', 'isPrivate'])
			.where('id', '=', id)
			.executeTakeFirst();

		if (!result) {
			throw new Error(`Tag with id ${id} not found`);
		}

		return {
			id: result.id,
			name: result.name,
			description: result.description ?? undefined,
			color: result.color,
			colorSet: result.colorSet,
			isPrivate: Boolean(result.isPrivate)
		};
	}
}