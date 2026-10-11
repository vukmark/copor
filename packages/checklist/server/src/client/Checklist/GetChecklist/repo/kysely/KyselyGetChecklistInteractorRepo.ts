import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetChecklistDTO} from '@copor/checklist/domain/Checklist/interactor/dto/GetChecklistDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyGetChecklistInteractorRepo implements GetItem<GetChecklistDTO> {
	async load(id: string): Promise<GetChecklistDTO> {
		const result = await db
			.selectFrom('checklist')
			.select(['id', 'title', 'actorId'])
			.where('id', '=', id)
			.executeTakeFirst();

		if (!result) {
			throw new Error(`Checklist with id ${id} not found`);
		}

		return {
			... result,
			title: result.title ?? undefined
		};
	}
}