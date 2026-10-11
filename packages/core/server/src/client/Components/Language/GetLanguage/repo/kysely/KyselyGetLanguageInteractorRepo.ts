import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/GetLanguageDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyGetLanguageInteractorRepo implements GetItem<GetLanguageDTO> {
	async load(id: string): Promise<GetLanguageDTO> {
		const result = await db
			.selectFrom('language')
			.select([
				'id',
				'name',
				'code',
				'nativeName',
				'publishStatus'
			] as const)
			.where('id', '=', id)
			.executeTakeFirst();

		if (!result) {
			throw new Error(`Language with id ${id} not found`);
		}

		return {
			... result
		};
	}
}
