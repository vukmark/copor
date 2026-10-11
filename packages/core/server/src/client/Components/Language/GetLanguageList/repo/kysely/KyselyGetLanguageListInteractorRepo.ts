import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/GetLanguageDTO';
import {db} from '@copor/core/client/AppDataSource';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class KyselyGetLanguageListInteractorRepo implements ListItems<GetLanguageDTO> {
	public async list(input: ListRepoInputDTO): Promise<GetLanguageDTO[]> {
		let query = db
			.selectFrom('language')
			.select([
				'id',
				'name',
				'code',
				'nativeName',
				'publishStatus'
			] as const);

		if (input.limit && input.offset) {
			const parsedLimit = parseInt(input.limit, 10);
			const parsedOffset = parseInt(input.offset, 10);

			query = query.limit(parsedLimit).offset(parsedOffset);
		}

		const results = await query.execute();

		return results.map((result) => ({
			... result
		}));
	}
}
