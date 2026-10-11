import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/SaveLanguageDTO';
import {UniqueIdGenerator} from '@copor/core/domain/Core/Repository/UniqueIdGenerator';
import {db} from '@copor/core/client/AppDataSource';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';

export class KyselyCreateLanguageInteractorRepo implements SaveItem<SaveLanguageDTO>, UniqueIdGenerator {
	getNewId(): Promise<string> {
		return Promise.resolve('unique-id');
	}
	async save(saveDTO: SaveLanguageDTO): Promise<void> {
		await db
			.insertInto('language')
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
