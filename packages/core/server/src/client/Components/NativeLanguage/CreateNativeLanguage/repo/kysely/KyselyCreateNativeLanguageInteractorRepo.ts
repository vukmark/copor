import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveNativeLanguageDTO} from '@copor/core/domain/Components/NativeLanguage/interactor/dto/SaveNativeLanguageDTO';
import {UniqueIdGenerator} from '@copor/core/domain/Core/Repository/UniqueIdGenerator';
import {db} from '@copor/core/client/AppDataSource';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';

export class KyselyCreateNativeLanguageInteractorRepo implements SaveItem<SaveNativeLanguageDTO>, UniqueIdGenerator {
	getNewId(): Promise<string> {
		return Promise.resolve('unique-id');
	}
	async save(saveDTO: SaveNativeLanguageDTO): Promise<void> {
		await db
			.insertInto('nativeLanguage')
			.values({
				id: saveDTO.id,
				name: saveDTO.name,
				code: saveDTO.code,
				nativeName: saveDTO.nativeName,
				publishStatus: saveDTO.publishStatus,
				...TimestampHelper.getTimestampForCreate(saveDTO.actorId)
			})
			.execute();
	}
}
