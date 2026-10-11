import {SaveNativeLanguageRepo} from '@copor/core/domain/Components/NativeLanguage/repository/SaveNativeLanguageRepo';
import {SaveNativeLanguageDTO} from '@copor/core/domain/Components/NativeLanguage/interactor/dto/SaveNativeLanguageDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyUpdateNativeLanguageInteractorRepo implements SaveNativeLanguageRepo {
	async save(saveDTO: SaveNativeLanguageDTO): Promise<void> {
		await db
			.updateTable('nativeLanguage')
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
