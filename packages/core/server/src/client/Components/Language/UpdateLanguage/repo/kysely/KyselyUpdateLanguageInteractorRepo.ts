import {SaveLanguageRepo} from '@copor/core/domain/Components/Language/repository/SaveLanguageRepo';
import {SaveLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/SaveLanguageDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyUpdateLanguageInteractorRepo implements SaveLanguageRepo {
	async save(saveDTO: SaveLanguageDTO): Promise<void> {
		await db
			.updateTable('language')
			.set({
				name: saveDTO.name,
				code: saveDTO.code,
				nativeName: saveDTO.nativeName,
				publishStatus: saveDTO.publishStatus
			})
			.where('id', '=', saveDTO.id)
			.execute();
	}
}
